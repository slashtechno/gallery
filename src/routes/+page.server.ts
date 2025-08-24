import {
  convertFileToBase64,
  primaryUserId,
} from "$lib/utils.js";
import { loadImagesForUser, imageCollection } from "$lib/storage.server.js";
import { fail, redirect } from "@sveltejs/kit";
import { writeFile } from "fs/promises";

export const actions = {
  upload: async ({ request, locals }) => {
    const data = await request.formData();
    const session = await locals.auth();
    if (!session?.user) {
      redirect(303, `/auth/signin`);
    }
    try {
      const images = data.getAll("images");
      console.log(images);
      for (const image of images) {
        const file = image as File;
        // https://stackoverflow.com/a/75316026
        const imageBase64 = await convertFileToBase64(file);
        console.log(imageBase64?.slice(-5));
        const newImageId = crypto.randomUUID();
        if (!imageBase64) continue;
        await imageCollection.setItem(newImageId, {
          id: newImageId,
          content: imageBase64,
          userId: session.user.id!,
          mimeType: file.type,
        });
        // await writeFile(
        //   `./files/${file.name}`,
        //   new Uint8Array(await file.arrayBuffer())
        // );
      }
    } catch (error) {
      console.error(error);
      return fail(422, {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  },
};

export async function load({}) {
  return {
    images: await loadImagesForUser(primaryUserId),
  };
}

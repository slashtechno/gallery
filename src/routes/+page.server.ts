import {
  convertFileToBase64,
  imageTodataUrl,
} from "$lib/utils.js";
import { fileToCleanImage } from "$lib/storage.server.js";
import { forbiddenFail, primaryUserId } from "$lib/consts.js";
import { loadImagesForUser, imageCollection } from "$lib/storage.server.js";
import type { Image } from "$lib/utils.js";
import { fail, redirect } from "@sveltejs/kit";
import { writeFile } from "fs/promises";
// console.log("Formats:", sharp.format); // print available formats

export const actions = {
  upload: async ({ request, locals }) => {
    const data = await request.formData();
    const session = await locals.auth();
    if (!session?.user) {
      redirect(303, `/auth/signin`);
    }
    try {
      const images = data.getAll("images");
      // console.log(images);
      for (const image of images) {
        const file = image as File;

        const imageObject = await fileToCleanImage(file, session.user.id!);

        // If there's no image data, continue
        if (!imageObject.content) continue;

        await imageCollection.setItem(imageObject.id, imageObject);
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

      return { success: true };

  },
  delete: async ({ request, locals }) => {
    const data = await request.formData();
    const session = await locals.auth();
    if (!session?.user) {
      redirect(303, `/auth/signin`);
    }

    const imageId = data.get("id")
    if (!imageId || typeof imageId != "string") return fail(
        400,
        {imageId, invalid: true}
    );

    const image = await imageCollection.getItem(imageId)
    if (image?.userId != session.user.id) {
        return forbiddenFail
    }

    await imageCollection.removeItem(image?.id!, { removeMeta: true });

    
		return { success: true };
  },
};

export async function load({}) {
  return {
    images: await loadImagesForUser(primaryUserId),
  };
}

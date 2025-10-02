import {
  convertFileToBase64,
  imageTodataUrl,
} from "$lib/utils.js";
import { fileToCleanImage, getUserName, getUserIdByEmail } from "$lib/storage.server.js";
import { forbiddenFail } from "$lib/consts.js";
import { loadImagesForUser, imageCollection } from "$lib/storage.server.js";
import type { Image } from "$lib/utils.js";
import { fail, redirect } from "@sveltejs/kit";
import { writeFile } from "fs/promises";
import { getAllowedEmails } from "../auth";
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
      if (!images || images.length === 0) {
        return fail(422, { uploadError: "No files selected" });
      }
      for (const image of images) {
        const file = image as File;

        const imageObject = await fileToCleanImage(file, session.user.id!);

        // If fileToCleanImage returned null (empty file or invalid), skip
        if (!imageObject) continue;

        // If there's no image data, continue
        if (!imageObject.content) continue;

        await imageCollection.setItem(imageObject.id, imageObject);
      }
    } catch (error) {
      console.error(error);
      return fail(422, {
        uploadError: error instanceof Error ? error.message : String(error),
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
        // return a string under deleteError so the form UI can show it cleanly
        {deleteError: "Invalid image id"}
    );

    const image = await imageCollection.getItem(imageId)
    if (image?.userId != session.user.id) {
        // not allowed to delete other people's images
        return fail(403, { deleteError: "Forbidden" })
    }

    await imageCollection.removeItem(image?.id!, { removeMeta: true });

    
	return { success: true };
  },
};

export async function load({ locals }: { locals: any }) {
  const session = await locals.auth();
  
  if (session?.user) {
    // Authenticated user - show their own images
    const targetUserId = session.user.id!;
    const userName = session.user.name || session.user.email || "User";
    
    return {
      images: await loadImagesForUser(targetUserId),
      userName: userName,
      isOwnGallery: true
    };
  } else {
    // Unauthenticated user - show images for first allowed email
    const allowedEmails = getAllowedEmails();
    if (allowedEmails.length > 0) {
      const firstEmail = allowedEmails[0];
      const userId = await getUserIdByEmail(firstEmail);
      if (userId) {
        const userName = await getUserName(userId);
        return {
          images: await loadImagesForUser(userId),
          userName: userName,
          isOwnGallery: false
        };
      }
    }
    
    // No user found or no allowed emails configured - show empty gallery
    return {
      images: [],
      userName: "Welcome",
      isOwnGallery: false,
      showSignInPrompt: true
    };
  }
}

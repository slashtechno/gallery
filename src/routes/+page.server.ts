import {
  convertFileToBase64,
  imageTodataUrl,
  primaryUserId,
} from "$lib/utils.js";
import { loadImagesForUser, imageCollection } from "$lib/storage.server.js";
import type { Image } from "$lib/utils.js";
import { fail, redirect } from "@sveltejs/kit";
import { writeFile } from "fs/promises";
import convert from 'heic-convert';
import sharp from "sharp";
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
        // This is not const since if it's heif, it may need to be converted to a jpeg
        let arrayBuffer = await file.arrayBuffer()
        let inputBuffer = Buffer.from(arrayBuffer);

        // EXIF
        // Inspect metadata, strip it, and return base64
        const beforeMeta = await sharp(inputBuffer).metadata();
        // console.log("Before metadata:", beforeMeta);

        // Check if the the file is heif
        if (beforeMeta.format == "heif"){
            arrayBuffer = await convert({ buffer: inputBuffer,     format: 'JPEG', quality: 1 });
            inputBuffer = Buffer.from(arrayBuffer);
        }

        // Strip metadata (don't call .withMetadata())
        const outputBuffer = await sharp(inputBuffer).toBuffer();

        // Inspect metadata AFTER stripping
        const afterMeta = await sharp(outputBuffer).metadata();
        console.log("After metadata:", afterMeta);
        const imageBase64 = outputBuffer.toString("base64");


        if (!imageBase64) continue;

        const newImageId = crypto.randomUUID();
        const imageObject: Image = {
          id: newImageId,
          content: imageBase64,
          userId: session.user.id!,
          mimeType: file.type,
        };



        await imageCollection.setItem(newImageId, imageObject);
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

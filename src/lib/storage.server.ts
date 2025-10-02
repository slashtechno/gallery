// everything that needs to load from the db needs to go in a server-only (https://svelte.dev/docs/kit/server-only-modules) file like this since otherwise, it'll fail
import fsDriver from "unstorage/drivers/fs";
import { createStorage } from "unstorage";
import { prefixStorage } from "unstorage";
import type { Image } from "$lib/utils";
import convert from "heic-convert";
import sharp from "sharp";
import { downscaleFactor } from "./consts";
import type { User } from "@auth/sveltekit";
import redisDriver from "unstorage/drivers/redis";
import { REDIS_URL } from "$env/static/private";



export const dataStorage = createStorage({
  driver: redisDriver({
    url: REDIS_URL,
    base: "gallery"
  })
});


export const imageCollection = prefixStorage<Image>(dataStorage, "img:")

export async function loadImagesForUser(userId: string): Promise<Image[]> {
    const keys = await imageCollection.getKeys();
    const userImages: Image[] = []
    for (const key of keys) {
      const image = await imageCollection.getItem(key);
      if (image?.userId == userId) {
        userImages.push(image)
      }
    }
    return userImages;
}


export async function fileToCleanImage(file: File, userId: string): Promise<Image | null> {
  // This is not const since if it's heif, it may need to be converted to a jpeg
  let arrayBuffer = await file.arrayBuffer();
  if (!arrayBuffer || arrayBuffer.byteLength === 0) {
    // empty file — caller should skip
    return null;
  }
  let inputBuffer = Buffer.from(arrayBuffer);

  // EXIF
  // Inspect metadata, strip it, and return base64
  const beforeMeta = await sharp(inputBuffer).metadata();
  // console.log("Before metadata:", beforeMeta);

  // Check if the the file is heif
  if (beforeMeta.format == "heif") {
    arrayBuffer = await convert({
      buffer: inputBuffer,
      format: "JPEG",
      quality: 1,
    });
    inputBuffer = Buffer.from(arrayBuffer);
  }

  // Strip metadata (don't call .withMetadata())
  // Re-load and downscale
  const outputBuffer = await sharp(inputBuffer).resize(
    {width: beforeMeta.width*downscaleFactor}
  ).toBuffer();

  // Inspect metadata AFTER stripping
  const afterMeta = await sharp(outputBuffer).metadata();
  console.log("After metadata:", afterMeta);

  // Convert to base65
  const imageBase64 = outputBuffer.toString("base64")

  
  const newImageId = crypto.randomUUID();
  return {
    id: newImageId,
    content: imageBase64,
    userId: userId,
    mimeType: file.type,
  };
}


export async function getUserName(id: string): Promise<string> {
    const targetUser = await dataStorage.getItem(`user:${id}`) as User;
    if (!targetUser.name) return "N/A";
    return targetUser.name;

}


export async function getUserIdByEmail(email: string): Promise<string | null> {
  try {
    const userId = await dataStorage.getItem(`user/email/${email}`) as string;
    return userId || null;
  } catch {
    return null;
  }
}
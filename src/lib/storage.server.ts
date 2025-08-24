// everything that needs to load from the db needs to go in a server-only (https://svelte.dev/docs/kit/server-only-modules) file like this since otherwise, it'll fail
import fsDriver from "unstorage/drivers/fs";
import { createStorage } from "unstorage";
import { prefixStorage } from "unstorage";
import type { Image } from "$lib/utils";
export const dataStorage = createStorage({
  driver: fsDriver({ base: "./db" }),
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
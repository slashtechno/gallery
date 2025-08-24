import type { UUID } from "crypto";
import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";
import { readFileSync } from 'fs';


export interface Image {
  id: UUID,
  content: Base64URLString
}

export const storage = createStorage({
  driver: fsDriver({ base: "./db" }),
});

export async function convertFileToBase64(file: File): Promise<string | null> {
  if (!file) return null;

  const arrayBuffer = await file.arrayBuffer();
  const base64String = Buffer.from(arrayBuffer).toString('base64');
  return base64String;
}

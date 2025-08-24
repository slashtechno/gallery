
export const primaryUserId = '43f1682c-31dc-4768-aa9c-ab6f1c642cb2';

export interface Image {
  id: string, // same UUID will be used as key in img:<uuid>
  content: string
  userId: string,
  mimeType: string
}

export async function convertFileToBase64(file: File): Promise<Base64URLString | null> {
  if (!file) return null;

  const arrayBuffer = await file.arrayBuffer();
  const base64String = Buffer.from(arrayBuffer).toString('base64');
  return base64String;
}

export function imageTodataUrl(image: Image): string {
  return `data:${image.mimeType};base64,${image.content}`;
}
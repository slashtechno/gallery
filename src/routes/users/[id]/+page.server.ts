import { loadImagesForUser, getUserName } from "$lib/storage.server.js";
import { fail } from "@sveltejs/kit";

export async function load({ params }: any) {
  const { id } = params;
  
  if (!id) {
    throw fail(400, { error: "User ID is required" });
  }

  try {
    const images = await loadImagesForUser(id);
    const userName = await getUserName(id);
    
    return {
      images,
      userName,
      userId: id
    };
  } catch (error) {
    throw fail(404, { error: "User not found" });
  }
}
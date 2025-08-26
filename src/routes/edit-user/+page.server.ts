import { dataStorage } from "$lib/storage.server.js";
import type { User } from "@auth/sveltekit";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  update: async ({ request, locals }) => {
    const data = await request.formData();
    const session = await locals.auth();

    const newName = data.get("name");

    if (!session?.user) {
      redirect(303, `/auth/signin`);
    }
    const currentUser = await dataStorage.getItem(`user:${session.user.id}`) as User;
    await dataStorage.setItem(`user:${session.user.id}`, {
        ...currentUser,
        name: newName
    });
    return { success: true };
  },
};

export async function load({ locals }) {
  const session = await locals.auth();
  return {
    name: session?.user.name,
  };
}

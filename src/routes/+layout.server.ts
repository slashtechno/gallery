import type { LayoutServerLoad } from './$types';

// https://svelte.dev/docs/kit/@sveltejs-kit#ServerLoad
export const load: LayoutServerLoad = async (event) => {
  const session = await event.locals.auth()
 
  return {
    session,
  }
}
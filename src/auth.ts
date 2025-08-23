import { SvelteKitAuth } from "@auth/sveltekit"
import Loops from "@auth/sveltekit/providers/loops"
import { UnstorageAdapter } from "@auth/unstorage-adapter"
import { createStorage, prefixStorage } from "unstorage"

import {
  AUTH_LOOPS_KEY,
  AUTH_LOOPS_TRANSACTIONAL_ID,
} from "$env/static/private"
// import GitHub from "@auth/sveltekit/providers/github"
 

const storage = createStorage()
// const assetsStorage = prefixStorage(storage, "auth");

export const { handle, signIn, signOut } = SvelteKitAuth({
    adapter: UnstorageAdapter(storage),
    providers: [
    Loops({
      apiKey: AUTH_LOOPS_KEY,
      transactionalId: AUTH_LOOPS_TRANSACTIONAL_ID,
    }) as any,
    // GitHub
  ],
})
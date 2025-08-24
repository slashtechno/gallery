import { SvelteKitAuth } from "@auth/sveltekit"
import Loops from "@auth/sveltekit/providers/loops"
import { UnstorageAdapter } from "@auth/unstorage-adapter"
import { createStorage, prefixStorage } from "unstorage"

import {
  AUTH_LOOPS_KEY,
  AUTH_LOOPS_TRANSACTIONAL_ID,
  AUTH_ALLOWED_EMAILS
} from "$env/static/private"
import { storage } from "$lib/db"
// import GitHub from "@auth/sveltekit/providers/github"
 

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
  // https://authjs.dev/reference/sveltekit/types#callbacks
  callbacks: {
    // https://authjs.dev/reference/sveltekit/types#signin
    async signIn({profile}) {
      if (!profile?.email) return false;
      return isAllowedEmail(profile.email);
    }
  } 
})

function getAllowedEmails(): string[] {
  return AUTH_ALLOWED_EMAILS
    .split(",")
    .map(e => e.trim())
    .filter(e => e.length > 0);
}

export function isAllowedEmail(email: string): boolean {
  return getAllowedEmails().includes(email);
}

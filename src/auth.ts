import { SvelteKitAuth, type DefaultSession } from "@auth/sveltekit";
import Loops from "@auth/sveltekit/providers/loops";
import { UnstorageAdapter } from "@auth/unstorage-adapter";
import { createStorage, prefixStorage } from "unstorage";
import {
  AUTH_LOOPS_KEY,
  AUTH_LOOPS_TRANSACTIONAL_ID,
  AUTH_ALLOWED_EMAILS,
} from "$env/static/private";
import { storage } from "$lib/db";
// import GitHub from "@auth/sveltekit/providers/github"

declare module "@auth/sveltekit" {
  interface Session {
    user: {
      // images: string
    } & DefaultSession["user"];
  }
}

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
    async signIn({ profile, user, account }) {
      // console.log(profile)
      // if (!profile?.email) return false;
      if (!user?.email) return false;
      // return isAllowedEmail(profile.email);
      return isAllowedEmail(user.email);
    },
    session: async ({ session, token }) => {
      if (token) {
        // session.user.images =
      }
      // `session.user.userId` is now a valid property, and will be type-checked
      // in places like `useSession().data.user` or `auth().user`
      return session;
    },
  },
});

function getAllowedEmails(): string[] {
  console.log(AUTH_ALLOWED_EMAILS);
  return AUTH_ALLOWED_EMAILS.split(",")
    .map((e) => e.trim())
    .filter((e) => e.length > 0);
}

export function isAllowedEmail(email: string): boolean {
  // console.log(getAllowedEmails());
  return getAllowedEmails().includes(email);
}

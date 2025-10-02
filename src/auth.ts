import { SvelteKitAuth, type DefaultSession } from "@auth/sveltekit";
import Loops from "@auth/sveltekit/providers/loops";
import { UnstorageAdapter } from "@auth/unstorage-adapter";
import {
  AUTH_LOOPS_KEY,
  AUTH_LOOPS_TRANSACTIONAL_ID,
  AUTH_ALLOWED_EMAILS,
} from "$env/static/private";
import { dataStorage } from "$lib/storage.server";
// import GitHub from "@auth/sveltekit/providers/github"

declare module "@auth/sveltekit" {
  interface Session {
    user: {
      // images: string
    } & DefaultSession["user"];
  }
}

export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: UnstorageAdapter(dataStorage),
  providers: [
    Loops({
      apiKey: AUTH_LOOPS_KEY,
      transactionalId: AUTH_LOOPS_TRANSACTIONAL_ID,
    }) as any,
    // GitHub
  ],
  // allow running on hobby / container hosts where the reported Host header
  // may not match an expected trusted host
  trustHost: true,
  // https://authjs.dev/reference/sveltekit/types#callbacks
  callbacks: {
    // https://authjs.dev/reference/sveltekit/types#signin
    async signIn({ profile, user, account }) {
      // Only allow users with emails in AUTH_ALLOWED_EMAILS to sign in
      if (!user?.email) return false;
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

export { getAllowedEmails };

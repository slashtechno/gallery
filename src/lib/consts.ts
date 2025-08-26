export const primaryUserId = "43f1682c-31dc-4768-aa9c-ab6f1c642cb2";
import { fail } from "@sveltejs/kit";

export const forbiddenFail = fail(403, {
  forbidden: true,
});

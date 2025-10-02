import { fail } from "@sveltejs/kit";

export const downscaleFactor = 0.5

export const forbiddenFail = fail(403, {
  forbidden: true,
});

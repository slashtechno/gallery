export const primaryUserId = "51f40a3d-70bb-461d-96a0-5dd729e3c452";
import { fail } from "@sveltejs/kit";

export const downscaleFactor = 0.5

export const forbiddenFail = fail(403, {
  forbidden: true,
});

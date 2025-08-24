import { fail } from '@sveltejs/kit';
import { writeFile } from 'fs/promises';

export const actions = {
	upload: async ({ request }) => {
		const data = await request.formData();
		try {
			const images = data.getAll("images");
			console.log(images);
			for (const image of images) {
				const file = image as File;
                // https://stackoverflow.com/a/75316026
				await writeFile(`./files/${file.name}`, new Uint8Array(await file.arrayBuffer()));
			}
		} catch (error) {
            console.error(error);
			return fail(422, {
				error: (error instanceof Error ? error.message : String(error))
			});
		}
	},
};

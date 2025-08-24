<script lang="ts">
    import { enhance } from "$app/forms";
	let { form } = $props();
    let uploading = $state(false);
	let images: FileList | null = $state(null);
    
</script>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

	<form
		method="POST"
		action="/?/upload"
		use:enhance={() => {
			uploading = true;
			return async ({ update }) => {
				await update();
				uploading = false;
			};
		}}
        enctype="multipart/form-data"
	>
        <input bind:files={images} accept="image/png, image/jpeg" name="images" multiple type="file" />
        <button disabled={uploading} type="submit">Upload</button>
</form>

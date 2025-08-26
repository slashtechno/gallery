<script lang="ts">
  import { enhance } from "$app/forms";
  import FormError from "./FormError.svelte";
  let uploading = $state(false);
  let images: FileList | null = $state(null);
  import type {ActionData } from "../../routes/$types";
  let { form }: {form: ActionData} = $props();
</script>

<FormError form={form} />

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
  <input
    bind:files={images}
    accept="image/png, image/jpeg image/heic"
    name="images"
    multiple
    type="file"
  />
  <button disabled={uploading} type="submit">Upload</button>
</form>

<script lang="ts">
  import { enhance } from "$app/forms";
  import FormError from "./FormError.svelte";
  let uploading = $state(false);
  let images: FileList | null = $state(null);
  import type {ActionData } from "../../routes/$types";
  let { form }: {form: ActionData} = $props();
</script>

<!-- Show upload-specific errors only -->
<FormError form={form} field="uploadError" />

<form
  class="w-full max-w-md flex items-center gap-3"
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
    class="flex-1"
    bind:files={images}
    accept="image/png, image/jpeg, image/heic"
    name="images"
    multiple
    type="file"
  />
  <button class="px-3 py-1 rounded bg-gray-800 text-white" disabled={uploading} type="submit">Upload</button>
</form>

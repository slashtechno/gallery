<script lang="ts">
  import { enhance } from "$app/forms";
  import type {ActionData } from "../../routes/$types";
  import type { Image } from "$lib/utils";
  let { form, image }: {form: ActionData, image: Image} = $props();
  import FormError from "$lib/components/FormError.svelte";

    let deleting = $state(false);
</script>

<FormError form={form} />

<!-- https://svelte.dev/tutorial/kit/named-form-actions (the delete action is a good example) -->
<form
  method="POST"
  action="/?/delete"
  use:enhance={() => {
    deleting = true;
    return async ({ update }) => {
      await update();
      deleting = false;
    };
  }}
>
  <input
    type="hidden"
    name="id"
    value={image.id}
  />
  <button disabled={deleting} type="submit">Delete</button>
</form>

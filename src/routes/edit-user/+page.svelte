<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "../../routes/$types";
  let { form }: { form: ActionData } = $props();
  import FormError from "$lib/components/FormError.svelte";
  import { page } from "$app/state";
  let userName = $state(page.data.session?.user?.name);
  let updating = $state(false);
</script>

<FormError {form} />

<!-- https://svelte.dev/tutorial/kit/named-form-actions (the delete action is a good example) -->
<form
  method="POST"
  action="?/update"
  use:enhance={() => {
    updating = true;
    return async ({ update }) => {
      await update();
      updating = false;
    };
  }}
  class="flex flex-col items-center"
>
  <label for="name">Display Name</label>
  <input
    id="name"
    name="name"
    autocomplete="username"
    bind:value={userName}
    placeholder="person"
  />
  <button disabled={updating} type="submit">Update</button>
</form>

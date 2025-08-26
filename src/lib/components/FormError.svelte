<script lang="ts">
  import type { ActionData } from "../../routes/$types";
  let { form }: { form: ActionData } = $props();
</script>

{#if form?.error}
  <p class="error">{form.error}</p>
{/if}

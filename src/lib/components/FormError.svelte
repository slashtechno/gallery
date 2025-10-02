<script lang="ts">
  // Displays a form-level error. Provide `field` to show a specific action's error (e.g. "uploadError").
  import type { ActionData } from "../../routes/$types";

  // Single $props() call with typing so the component's props are declared correctly
  let { form, field = null }: { form?: ActionData; field?: string | null } = $props();

  function renderErr(err: any) {
    if (!err) return null;
    if (typeof err === 'string') return err;
    try {
      return JSON.stringify(err);
    } catch {
      return String(err);
    }
  }
</script>

{#if field}
  {#if form && (form as any)[field]}
    <p class="error">{renderErr((form as any)[field])}</p>
  {/if}
{:else}
  {#if form && (form as any).error}
    <p class="error">{renderErr((form as any).error)}</p>
  {/if}
{/if}

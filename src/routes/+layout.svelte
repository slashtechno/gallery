<script lang="ts">
  import "../app.css";
  import Gallery from "$lib/assets/Gallery.excalidraw.svg";
  import ThemeSwitcher from "$lib/ThemeSwitcher.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={Gallery} />
</svelte:head>
{@render children?.()}
  <div class="absolute right-10	 bottom-0 size-16 ...">
    <ThemeSwitcher />
  </div>

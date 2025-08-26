<script lang="ts">
  import "../app.css";
  import Gallery from "$lib/assets/Gallery.excalidraw.svg";
  import ThemeSwitcher from "$lib/ThemeSwitcher.svelte";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={Gallery} />
</svelte:head>

<div class="flex flex-col h-screen">
<Header/>
<span class="flex-grow h-10/12">
{@render children?.()}
</span>
<Footer/>
</div>
<div class="absolute right-10 bottom-0 size-16 ...">
  <ThemeSwitcher />
</div>

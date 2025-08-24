<script lang="ts">
    import { imageTodataUrl, type Image } from "$lib/utils";
    let {images}: {images: Image[]} = $props()
</script>
<div class="flex justify-center">
<!-- justify-items-center = justify items horizontally in their cells -->
 <!-- inline-grid =  grid that takes up only as much width as is needed for the items-->
<!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"> -->
<div class="flex flex-wrap justify-center gap-5">
{#each images as image}
<!-- https://tailwindcss.com/docs/object-fit -->
    <img src={imageTodataUrl(image)} alt="{image.userId}'s image" class="h-100 w-80 object-cover"/>
{/each}
</div>
</div>
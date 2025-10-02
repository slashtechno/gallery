<script lang="ts">
  import { imageTodataUrl, type Image } from "$lib/utils";
  import type { ActionData } from "../../routes/$types";
  // Make form and userName optional to allow using ImageGrid in read-only contexts
  let { images = [], form = null, userName = '' }: { images?: Image[]; form?: ActionData | null; userName?: string } = $props();
  import { page } from "$app/state";
  import DeleteImage from "./DeleteImage.svelte";
</script>

<div class="flex flex-col items-center">
  <h2 class="text-xl mb-4">{userName}'s gallery</h2>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center">
    {#each images as image}
      <div class="w-48 h-64 flex flex-col items-center">
        <div class="w-full h-full flex items-center justify-center border rounded overflow-hidden bg-transparent">
          <img
            src={imageTodataUrl(image)}
            alt="{image.userId}'s image"
            class="max-h-full max-w-full object-contain"
          />
        </div>
        {#if page.data.session?.user?.id == image.userId}
          <div class="mt-2 w-full flex justify-center">
            <DeleteImage {image} {form} />
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

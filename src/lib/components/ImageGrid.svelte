<script lang="ts">
  import { imageTodataUrl, type Image } from "$lib/utils";
  import type { DefaultSession } from "@auth/sveltekit";
  import type { ActionData } from "../../routes/$types";
  //   let { images, session }: { images: Image[]; session: DefaultSession } =
  let { images, form }: { images: Image[]; form: ActionData } = $props();
  import { page } from "$app/state";
  import DeleteImage from "./DeleteImage.svelte";
</script>

<div class="flex justify-center">
  <!-- justify-items-center = justify items horizontally in their cells -->
  <!-- inline-grid =  grid that takes up only as much width as is needed for the items-->
  <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"> -->
  <div class="flex flex-wrap justify-center gap-5">
    {#each images as image}
    <!-- using flex-col makes it so the delete button is below the image -->
      <div class="flex flex-col items-center">
        <!-- https://tailwindcss.com/docs/object-fit -->
        <img
          src={imageTodataUrl(image)}
          alt="{image.userId}'s image"
          class="h-100 w-80 object-cover"
        />
        {#if page.data.session?.user?.id == image.userId}
          <DeleteImage {image} {form} />
        {/if}
      </div>
    {/each}
  </div>
</div>

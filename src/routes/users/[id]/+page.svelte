<script>
  import ImageGrid from "$lib/components/ImageGrid.svelte";
  import { page } from "$app/state";

  let { data } = $props();
</script>

<div class="flex flex-col items-center">
  <h1 class="text-2xl font-bold mb-4">{data.userName}'s Gallery</h1>
  <p class="text-sm text-gray-600 mb-6">User ID: {data.userId}</p>
  
  <ImageGrid images={data.images} userName={data.userName} form={null} />
</div>
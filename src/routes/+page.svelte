<script>
  import { SignIn, SignOut } from "@auth/sveltekit/components"
  import { page } from "$app/state";
  import UploadImage from "$lib/components/UploadImage.svelte";
  import ImageGrid from "$lib/components/ImageGrid.svelte";
  $inspect(page);
	let { form, data } = $props();

</script>
 
<div class="flex flex-col items-center">
  {#if page.data.session}
    {#if page.data.session.user?.image}
      <img
        src={page.data.session.user.image}
        class="avatar"
        alt="User Avatar"
      />
    {/if}
    <div class="text-center">
      <span class="text-sm">Signed in as</span>
      <br />
      <span class="font-bold">{page.data.session.user?.name ?? page.data.session.user?.email}</span>
      <br />
      <span class="font-light font-mono">{page.data.session.user?.id}</span>
      <SignOut>
        {#snippet submitButton()}
        <div >Sign out</div>
        {/snippet}
      </SignOut>
    </div>
    <UploadImage form={form}/>
    {/if}
  <ImageGrid images={data.images} userName={data.userName} form={form}/>
</div>
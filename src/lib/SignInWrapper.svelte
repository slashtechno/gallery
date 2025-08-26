<script>
  import { SignIn, SignOut } from "@auth/sveltekit/components"
  import { page } from "$app/state";
  import UploadImage from "$lib/components/UploadImage.svelte";
  import ImageGrid from "$lib/components/ImageGrid.svelte";
  $inspect(page);
</script>
 

{#if !page.data.session}
    <span>You are not signed in</span>
    <!-- Display link to built-in login page -->
    <!-- <SignIn/> -->
    <!-- Same as above, but add a custom button -->
    <SignIn>
    {#snippet submitButton()}
           <p class="underline">Sign in</p>
          {/snippet}
    </SignIn>
    <!-- Only display email -->
    <!-- <SignIn provider="email"/> -->
{:else}
<SignOut>
        {#snippet submitButton()}
           <p class="underline">Sign out</p>
      <p><a href="/edit-user" class="underline">Edit user</a></p>
          {/snippet}
</SignOut>
{/if}
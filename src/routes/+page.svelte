<script>
  import { SignIn, SignOut } from "@auth/sveltekit/components"
  import { page } from "$app/stores"
</script>
 
<div class="flex flex-col items-center">
  {#if $page.data.session}
    {#if $page.data.session.user?.image}
      <img
        src={$page.data.session.user.image}
        class="avatar"
        alt="User Avatar"
      />
    {/if}
    <span class="signedInText">
      <small>Signed in as</small><br />
      <strong>{$page.data.session.user?.name ?? "User"}</strong>
    </span>
    <SignOut>
      <div slot="submitButton" class="buttonPrimary">Sign out</div>
    </SignOut>
  {:else}
    <span class="notSignedInText">You are not signed in</span>
    <!-- Display link to built-in login page -->
    <!-- <SignIn/> -->
    <!-- Same as above, but add a custom button -->
    <SignIn>
    <div slot="submitButton" class="text-secondary bg-secondary rounded-2xl px-4 py-2 my-2">Sign in</div>
    </SignIn>

    <!-- Only display email -->
    <!-- <SignIn provider="email"/> -->
  {/if}
</div>
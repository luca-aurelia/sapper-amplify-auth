<script>
  import { get } from "svelte/store"
  import { stores } from "@sapper/app"
  const { session } = stores()
  import SignIn from "../components/SignIn.svelte"
  import SignOut from "../components/SignOut.svelte"
</script>

<style>

</style>

<svelte:head>
  <title>Sapper auth example</title>
</svelte:head>

{#if $session.authorized}
  <SignOut />
{:else}
  <SignIn />
{/if}

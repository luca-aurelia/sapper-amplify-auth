<script>
  import { goto, stores } from "@sapper/app"
  const { session } = stores()
  import Login from "../components/Login.svelte"
  import Logout from "../components/Logout.svelte"

  let username
  let password

  const logIn = async () => {
    await window.fetch("/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    })
    goto("/protected")
  }
</script>

<style>

</style>

<svelte:head>
  <title>Sapper auth example</title>
</svelte:head>

{#if $session.loggedIn}
  <Logout />
{:else}
  <Login />
{/if}

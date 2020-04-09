<script>
  import { goto } from "@sapper/app"
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

<h1>Sign In</h1>
<div>
  Username:
  <input bind:value={username} />
</div>
<div>
  Password:
  <input bind:value={password} />
</div>
<button on:click={logIn}>Log In</button>

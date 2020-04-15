<script>
  import { goto, stores } from "@sapper/app"
  const { session } = stores()

  let username
  let password
  let error

  const logIn = async () => {
    try {
      const response = await window.fetch("/login", {
        method: "POST",
        body: JSON.stringify({ username, password })
      })

      if (!response.ok) {
        const body = await response.json()
        const err = new Error(body.message)
        err.status = response.status
        err.statusText = response.statusText
        throw err
      }

      error = null
      $session.loggedIn = true
      goto("/protected")
    } catch (err) {
      error = err
      console.log(err)
    }
  }
</script>

<style>
  .error {
    color: red;
  }
</style>

<h1>Sign In</h1>
<div>
  Username:
  <input bind:value={username} />
</div>
<div>
  Password:
  <input bind:value={password} />
</div>
<div class="error">
  {#if error}{error.message}{/if}
</div>
<button on:click={logIn}>Log In</button>

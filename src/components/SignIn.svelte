<script>
  import { signIn } from "../helpers/auth"
  import { goto, stores } from "@sapper/app"
  const { session } = stores()

  let username
  let password
  let error

  const signInAndRedirect = async () => {
    try {
      await signIn(username, password, session)
      goto("/protected")
    } catch (err) {
      error = err
      throw err
      // console.log(err)
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
<button on:click={signInAndRedirect}>Sign In</button>

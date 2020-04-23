<script>
  import { signIn } from "../helpers/auth"
  import { goto, stores } from "@sapper/app"
  import queryString from "query-string"
  const { session } = stores()

  let username
  let password
  let error

  const { redirect = "/protected" } = queryString.parse(location.search)

  const signInAndRedirect = async () => {
    try {
      await signIn(username, password, session)
      goto(redirect)
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

<h1>Sign in 🗝</h1>
<div>
  Username:
  <input bind:value={username} />
</div>
<div>
  Password:
  <input bind:value={password} />
</div>
{#if error}
  <div class="error">{error.message}</div>
{/if}
<button on:click={signInAndRedirect}>Sign in</button>

<script>
  import { stores } from "@sapper/app"
  const { session } = stores()

  const logout = async () => {
    await window.fetch("/login", {
      method: "DELETE"
    })
    $session.loggedIn = false
  }
</script>

You're logged in.
<button on:click={logout}>Logout</button>

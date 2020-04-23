<script>
  import { stores } from "@sapper/app"
  import { signOut } from "../helpers/auth"

  const { session } = stores()

  const signOutOnClick = () => {
    signOut(session)
  }
</script>

<h1>Sign out 👋</h1>
<div>You're signed in 🍃</div>
<button on:click={signOutOnClick}>Sign Out</button>

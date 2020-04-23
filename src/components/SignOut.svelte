<script>
  import { stores } from "@sapper/app"
  import { signOut } from "../helpers/auth"

  const { session } = stores()

  const signOutOnClick = () => {
    signOut(session)
  }
</script>

You're logged in.
<button on:click={signOutOnClick}>Sign Out</button>

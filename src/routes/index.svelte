<script>
  import { signIn } from "../helpers/auth"
  import { goto, stores } from "@sapper/app"
  import queryString from "query-string"
  const { session } = stores()
</script>

<svelte:head>
  <title>Sapper auth example</title>
</svelte:head>

<h1>Hi there 👋</h1>
{#if $session.authorized}
  <div>You're signed in 🍃</div>
  <a href="/log-in">Sign out</a>
{:else}
  <a href="/log-in">Sign in</a>
{/if}

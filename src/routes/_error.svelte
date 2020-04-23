<script>
  import { onMount } from "svelte"
  import { goto } from "@sapper/app"

  export let status

  onMount(async () => {
    if (status === 401) {
      await goto("/")
      alert("You need to log in before going there.")
    }
  })
</script>

{#if status == 401}You need to be logged in to go there.{/if}

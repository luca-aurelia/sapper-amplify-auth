<script context="module">
  import authenticate from "../helpers/authenticate.js"

  export async function preload(page, session) {
    if (!session.loggedIn) {
      this.error(401, "Not authorized")
      return
    }

    try {
      const response = await this.fetch("protected.json", {
        method: "GET",
        credentials: "include"
      })
      const data = await response.json()
      return { data }
    } catch (error) {
      this.error(error.statusCode, error.message)
      console.log(error)
    }
  }

  // export function preload(page, session) {
  //   return authenticate(this, unauthenticatedPreload, page, session)
  // }
</script>

<script>
  export let data
</script>

<div>Sensitive data: {data}</div>

<script context="module">
  export async function preload(page, session) {
    if (!session.loggedIn) {
      this.error(401, "Not authorized")
      return
    }

    console.log("did the thing")

    try {
      const response = await this.fetch("protected.json", {
        method: "GET",
        credentials: "include"
      })
      const data = await response.json()
    } catch (error) {
      console.log(error)
    }

    return { data }
  }
</script>

<script>
  export let data
</script>

<div>Sensitive data: {data}</div>

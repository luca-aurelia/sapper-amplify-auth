<script context="module">
  export async function preload(page, session) {
    console.log("Preloading protected.svelte")

    try {
      console.log("fetching protected data")
      const response = await this.fetch("protected.json", {
        method: "GET",
        credentials: "include"
      })

      if (response.status >= 400) {
        const error = new Error("Error preloading.")
        error.statusCode = response.status
        throw error
      }

      const data = await response.json()
      return { data }
    } catch (error) {
      this.error(error.statusCode, error.message)
      console.log(error)
    }
  }
</script>

<script>
  export let data
</script>

<div>Sensitive data: {data}</div>

<script>
  export let selected = "Users", fields = [], data = [], offset;
  import authStore from "../stores/authStore";
  

  const generateTable = async () => {
      if (data.length > 0) {
        fields = [...Object.keys(data[0]), "action"]
        const newData = data.map(el=>{
            if (el.deletedAt) {
              el.action = "Restore"
            }
            else {
              el.action = "Delete"
            }
            return el
        })

        data = newData
        if (selected === "Movies") {
          const newFields = fields.filter(field=> field !== "image" && field !== "imageThumbnail" && field !== "description")
          fields = newFields
          data.map(el=>{
            delete el.imageThumbnail
            delete el.image
            delete el.description
            return el
          })
          data = data

        }
      }
    }


  const onClick = async (e) => {
    selected = e.target.text;
    offset = 0;
    let url = `http://localhost:3000/api/v1/${selected === "Users" ? 
    "users" : (selected === "Movies" ? "movies" : "ratings")}?limit=14&offset=0`
    let response = await fetch(url,{
        headers: {
            "Authorization": `Bearer ${$authStore.token}`
        }
    })
    data = await response.json()
    await generateTable(response)
    
  }
</script>

<div class="d-flex flex-column flex-shrink-0 p-3 text-white" style="width: 220px;">
  <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
    <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
    <span class="fs-4">Sidebar</span>
  </a>
  <hr>
  <ul class="nav nav-pills flex-column mb-auto">
    <li class="nav-item">
      <a href="#" class={`nav-link ${selected === "Users" ? "active" : "text-white"}`} on:click={onClick}>
        Users
      </a>
    </li>
    <li>
      <a href="#" class={`nav-link ${selected === "Movies" ? "active" : "text-white"}`} on:click={onClick}>
        Movies
      </a>
    </li>
    <li>
      <a href="#" class={`nav-link ${selected === "Ratings" ? "active" : "text-white"}`} on:click={onClick}>
        Ratings
      </a>
    </li>
  </ul>
</div>

<style>
  .nav-link.active {
    background-color: #d63837;
  }

  a {
      color: white;
    }
</style>
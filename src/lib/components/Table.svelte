<script>
    export let fields = [], data = [], selected="Users";

    import authStore from "../stores/authStore";

    const onAction = async (e, detail, i, selected) => {
      e.preventDefault()
      let url = '';
      let newData = []
      let newFields;
      if (detail === "Delete") {
        url = `http://localhost:3000/api/v1/${selected.toLowerCase()}/${i}`
        
      }
      else if (detail === "Restore") {
        url = `http://localhost:3000/api/v1/${selected.toLowerCase()}/restore/${i}`
      }

      let response = await fetch(`${url}`,{
          method: detail === "Delete" ? "DELETE" : "PATCH",
          headers: {
              "Authorization": `Bearer ${$authStore.token}`
          }
          
      })
      if (response.status === 204) {
        let response = await fetch(`http://localhost:3000/api/v1/${selected.toLowerCase()}`,{
          headers: {
              "Authorization": `Bearer ${$authStore.token}`
          }
        })
        newData = await response.json()
        
        if (newData.length > 0) {
          newFields = [...Object.keys(newData[0]), "action"]
        }
        newData = newData.map(el=>{
            if (el.deletedAt) {
              el.action = "Restore"
            }
            else {
              el.action = "Delete"
            }
            return el
        })
      if (selected === "Movies") {
        newFields = newFields.filter(field=> field !== "image" && field !== "imageThumbnail" && field !== "description")
        newData.map(el=>{
          delete el.imageThumbnail
          delete el.image
          delete el.description
          return el
        })

        
      }
      fields = newFields
      data = newData
      
    }
  }
</script>


<table class="table" data-bs-theme="dark">
    <thead>
      <tr>
        {#each fields as field (field)}
          <th scope="col">{field}</th>
        {/each}

      </tr>
    </thead>
    <tbody>
      
      {#each data as el (el.id)}
        <tr>
          <!-- <th scope="row">{movie}</th> -->
          {#each Object.values(el) as detail}
            {#if detail === "Delete"}
              <button type="button" class="btn btn-danger" style="background-color:#bb2d3b;" on:click={e=>onAction(e,detail,el.id, selected)}>{detail}</button>
            {:else if detail === "Restore"} <button type="button" class="btn btn-success" style="background-color:#157347;" on:click={e=>onAction(e,detail,el.id, selected)}>{detail}</button>
            {:else}
              <td>{detail}</td>
            {/if}
          {/each}        
        </tr>  
      {/each}
    </tbody>
  </table>


<style>

</style>
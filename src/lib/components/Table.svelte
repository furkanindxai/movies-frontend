<script>
    export let fields = [], data = [], selected="Users", limit, offset;

    import authStore from "../stores/authStore";

    const getMoreOfX = async (e) => {
      e.preventDefault()
      if (e.target.text === "Next") offset += 14
      else {
        if (offset - 14 < 0) offset = 0
        else offset = offset - 14
      }
      
      let url = `http://localhost:3000/api/v1/${selected === "Users" ? 
      "users" : (selected === "Movies" ? "movies" : "ratings")}?limit=${limit}&offset=${offset}`
      let response = await fetch(url,{
          headers: {
              "Authorization": `Bearer ${$authStore.token}`
          }
          })
      
      let resData = await response.json()
      if (resData.length > 0) {

        data = resData.length > 0 ? resData : data
  
        await generateTable(response) 
      }
      else {
        offset = offset - 14
      }
     
    }


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

    const onAction = async (e, detail, i, selected) => {
      e.preventDefault()
      let url = '';
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
        let response = await fetch(`http://localhost:3000/api/v1/${selected.toLowerCase()}?limit=${limit}&offset=${offset}`,{
          headers: {
              "Authorization": `Bearer ${$authStore.token}`
          }
        })
        data = await response.json()
        await generateTable(response)
      
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
              <button type="button" class="btn btn-danger" style="background-color:#bb2d3b;" 
              on:click={e=>onAction(e,detail,el.id, selected)}>{detail}</button>
            {:else if detail === "Restore"} <button type="button" class="btn btn-success"
             style="background-color:#157347;" on:click={e=>onAction(e,detail,el.id, selected)}>{detail}</button>
            {:else}
              <td>{detail}</td>
            {/if}
          {/each}        
        </tr>  
      {/each}
    </tbody>
    <tfoot>
      {#if offset > 0}
        <a href="" on:click={e=>getMoreOfX(e)}>Prev</a>
      {/if}
      {#if data.length === 14}
        <a href="" on:click={e=>getMoreOfX(e)}>Next</a>
      {/if}
    </tfoot>
  </table>


<style>

</style>

<script>
    export let fields = [], data = [], selected="Users", limit, offset, keyword, deleted;

    import authStore from "../../stores/authStore";
    import graphqlResponseParser from "../../../helpers/graphqlResponseParser";
    const URL = 'http://172.25.176.79:4002/graphql'

    const handleLoad = async (e) => {
      e.preventDefault()
      if (e.target.text === "Next") offset += 14
      else {
        if (offset - 14 < 0) offset = 0
        else offset = offset - 14
      }
      
      let response;

      if (selected === "Movies") {
        response = await fetch(URL, {
              method: 'POST',
            
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${$authStore.token}`
  
              },
            
              body: JSON.stringify({
                query: `query Movies {
                  movies(params: { limit: 14, offset: ${offset}, keyword: "${keyword}", deleted: "${deleted}" }) {
                      id
                      poster
                      title
                      directors
                      producers
                      genres
                      releaseYear
                      description
                      averageRating
                      imageThumbnail
                      image
                      createdAt
                      updatedAt
                      deletedAt
                  }
              }`
              })
          })
    }

    else if (selected === "Users") {
      response = await fetch(URL, {
          method: 'POST',
        
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${$authStore.token}`

          },
        
          body: JSON.stringify({
            query: `query Users {
                      users(params: { limit: 14, offset: ${offset}, keyword: "${keyword}", deleted: "${deleted}" }) {
                        id
                        email
                        roles
                        createdAt
                        updatedAt
                        deletedAt
                    }}`
          })
      })
    }

    else {
      response = await fetch(URL, {
          method: 'POST',
        
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${$authStore.token}`

          },
        
          body: JSON.stringify({
            query: ` query Ratings {
              ratings(params: { limit: 14, offset: ${offset}, deleted: "${deleted}" }) {
                  id
                  userId
                  movieId
                  rating
                  review
                  createdAt
                  updatedAt
                  deletedAt
              }
            }`
          })
      })
    }

    let resData = await response.json()
    resData = graphqlResponseParser(resData, 200, selected.toLowerCase())
    resData = resData.result



      // let url = `http://localhost:3000/api/v1/${selected === "Users" ? 
      // "users" : (selected === "Movies" ? "movies" : "ratings")}?limit=${limit}&offset=${offset}&keyword=${keyword}&deleted=${deleted}`
      // let response = await fetch(url,{
      //     headers: {
      //         "Authorization": `Bearer ${$authStore.token}`
      //     }
      // })
      
      // let resData = await response.json()
      if (resData.length > 0) {

        data = resData
  
        await generateTable() 
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
      let query = '';
      if (detail === "Delete") {
        if (selected === "Users") {
          query  = `mutation DeleteUserByAdmin {
                      deleteUserByAdmin(id: ${i})}`
        }
        else if (selected === "Movies") {
          query = `mutation DeleteMovie {
                      deleteMovie(id: ${i})}`
        }
        else {
          query = `mutation DeleteRating {
                    deleteRating(id: ${i})}`
        }
        
      }
      else if (detail === "Restore") {
        if (selected === "Users") {
          query  = `mutation RestoreUser {
                      restoreUser(id: ${i})}`
        }
        else if (selected === "Movies") {
          query = `mutation RestoreMovie {
                    restoreMovie(id: ${i})}`
        }
        else {
          query = `mutation RestoreRating {
                      restoreRating(id: ${i})}`
        }
      }

      let response = await fetch(URL, {
            method: 'POST',
          
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${$authStore.token}` 
            },
          
            body: JSON.stringify({
              query
            })
        })
        response = await response.json()
        response = graphqlResponseParser(response, 200, `${detail.toLowerCase()}${selected.substring(0, selected.length-1)}`)
      // let response = await fetch(`${url}`,{
      //     method: detail === "Delete" ? "DELETE" : "PATCH",
      //     headers: {
      //         "Authorization": `Bearer ${$authStore.token}`
      //     }
          
      // })
      if (response.responseCode === 204) {
        if (selected === "Movies") {
            query = `query Movies {
                movies(params: { limit: ${limit}, offset: ${offset}, keyword: "${keyword}", deleted: "${deleted}" }) {
                    id
                    poster
                    title
                    directors
                    producers
                    genres
                    releaseYear
                    description
                    averageRating
                    imageThumbnail
                    image
                    createdAt
                    updatedAt
                    deletedAt
                }
            }`
        }

        else if (selected === "Users") {
          query = `query Users {
                      users(params: { limit: ${limit}, offset: ${offset}, deleted: "${deleted}", keyword: "${keyword}" }) {
                                        id
                                        email
                                        roles
                                        createdAt
                                        updatedAt
                                        deletedAt
  
                    }}`
        }
        else {
          query = `query Ratings {
                      ratings(params: { limit: ${limit}, offset: ${offset}, deleted: "${deleted}" }) {
                          id
                          userId
                          movieId
                          rating
                          review
                          createdAt
                          updatedAt
                          deletedAt
                      }
                  }`
        }

        let response = await fetch(URL, {
            method: 'POST',
          
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${$authStore.token}` 
            },
          
            body: JSON.stringify({
              query
            })
        })
        response = await response.json()
        response = graphqlResponseParser(response, 200, `${selected.toLowerCase()}`)
        // let url = `http://localhost:3000/api/v1/${selected.toLowerCase()}?limit=${limit}&offset=${offset}&keyword=${keyword}&deleted=${deleted}`
        // url = selected.toLowerCase() !== "ratings" ? url :
        //   `http://localhost:3000/api/v1/${selected.toLowerCase()}?limit=${limit}&offset=${offset}&deleted=${deleted}`
        // let response = await fetch(url, {
        //   headers: {
        //       "Authorization": `Bearer ${$authStore.token}`
        //   }
        // })
        data = response.result
        await generateTable()
      
    }
  }

  const handleSearch = async (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
    offset = 0;
    let moviesList = []

    if (selected === "Movies") {
      moviesList = await fetch(URL, {
            method: 'POST',
          
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${$authStore.token}`
 
            },
          
            body: JSON.stringify({
              query: `query Movies {
                movies(params: { limit: 14, offset: ${offset}, keyword: "${keyword}", deleted: "${deleted}" }) {
                    id
                    poster
                    title
                    directors
                    producers
                    genres
                    releaseYear
                    description
                    averageRating
                    imageThumbnail
                    image
                    createdAt
                    updatedAt
                    deletedAt
                }
            }`
            })
        })
    }

    else if (selected === "Users") {
      moviesList = await fetch(URL, {
          method: 'POST',
        
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${$authStore.token}`

          },
        
          body: JSON.stringify({
            query: `query Users {
                      users(params: { limit: 14, offset: ${offset}, keyword: "${keyword}", deleted: "${deleted}" }) {
                        id
                        email
                        roles
                        createdAt
                        updatedAt
                        deletedAt
                    }}`
          })
      })
    }

    else {
      moviesList = await fetch(URL, {
          method: 'POST',
        
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${$authStore.token}`

          },
        
          body: JSON.stringify({
            query: `query Rating {
                      rating(id: ${keyword}) {
                          id
                          userId
                          movieId
                          rating
                          review
                          createdAt
                          updatedAt
                          deletedAt
                      }
                  }`
          })
      })
    }

    // let url = (selected.toLowerCase() === 'movies' || selected.toLowerCase() === 'users') ?
    //    `http://localhost:3000/api/v1/${selected.toLowerCase()}?keyword=${e.target.value}&limit=${limit}&deleted=${deleted}`:
    //    `http://localhost:3000/api/v1/${selected.toLowerCase()}/${keyword}`
    // let moviesList = await fetch(url, {
    //     headers: {
    //     "Authorization": `Bearer ${$authStore.token}`
    // }
    // })
    data = await moviesList.json()
    data = graphqlResponseParser(data, 200, selected.toLowerCase() === "ratings" ? "rating" : selected.toLowerCase())
    data = data.result
    if (!Array.isArray(data)) data = [data]
    await generateTable()
    }
  }
</script>


<table class="table" data-bs-theme="dark">
    <thead>
      <tr>
        <input type="text" placeholder={selected === "Ratings" ? "ID" : "Search"} class="admin-search" bind:value={keyword} on:keydown={e=>handleSearch(e)}>
      </tr>
      <tr>
        {#each fields as field (field)}
          <th scope="col">{field}</th>
        {/each}

      </tr>
    </thead>
    <tbody>
      
      {#each data as el (el.id)}
        <tr>
          {#each Object.values(el) as detail}
            {#if detail === "Delete"}
              <td>
                <button type="button" class="btn btn-danger" style="background-color:#bb2d3b;" 
                on:click={e=>onAction(e,detail,el.id, selected)}>{detail}</button>
              </td>
            {:else if detail === "Restore"} 
            <td>
              <button type="button" class="btn btn-success"
               style="background-color:#157347;" on:click={e=>onAction(e,detail,el.id, selected)}>{detail}</button>
            </td>
            {:else}
              <td>{detail}</td>
            {/if}
          {/each}        
        </tr>  
      {/each}
    </tbody>
    <tfoot>
      {#if offset > 0}
        <a href="" on:click={e=>handleLoad(e)}>Prev</a>
      {/if}
      {#if data.length === 14}
        <a href="" on:click={e=>handleLoad(e)}>Next</a>
      {/if}
    </tfoot>
  </table>


<style>
  .admin-search {
    margin: 5px;
    border: none;
    width: 120px;
  }
  input:focus{
    border: none;
    outline: none;
    color: #afafb3;
  }
  ::placeholder {
    color: #afafb3;
  }
  
</style>

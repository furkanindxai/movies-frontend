<script>
  export let selected = "Users", fields = [], data = [], offset, keyword, deleted, limit;
  import authStore from "../../stores/authStore";
  import graphqlResponseParser from "../../../helpers/graphqlResponseParser";

  let trueChecked = false;
  let falseChecked = false;

  const URL = 'http://172.25.176.79:4002/graphql'

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
    keyword = '';
    offset = 0;
    deleted = ''
    trueChecked = false;
    falseChecked =false;
    // "users" : (selected === "Movies" ? "movies" : "ratings")}?limit=14&offset=0`
    // let url = `http://localhost:3000/api/v1/${selected === "Users" ? 
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
                movies(params: { limit: 14, offset: 0 }) {
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
                      users(params: { limit: 14, offset: 0 }) {
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
              ratings(params: { limit: 14, offset: 0 }) {
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

    response = await response.json()
    response = graphqlResponseParser(response, 200, selected.toLowerCase())
    data = response.result
    await generateTable()
    // let response = await fetch(url,{
    //     headers: {
    //         "Authorization": `Bearer ${$authStore.token}`
    //     }
    // })
    // data = await response.json()
    
  }

  const onCheckboxChange = async (e) => {
    e.preventDefault()
    offset = 0;
    if (trueChecked && falseChecked || !trueChecked && !falseChecked) deleted = ''
    else if (trueChecked && !falseChecked) deleted ='true'
    else if (!trueChecked && falseChecked) deleted ='false'

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

    // let url = `http://localhost:3000/api/v1/${selected.toLowerCase()}?limit=${limit}&offset=${offset}&keyword=${keyword}&deleted=${deleted}`
    // url = selected.toLowerCase() !== "ratings" ? url : 
    //       `http://localhost:3000/api/v1/${selected.toLowerCase()}?limit=${limit}&offset=${offset}&deleted=${deleted}`
    // let response = await fetch(url,{
    //       headers: {
    //           "Authorization": `Bearer ${$authStore.token}`
    //       }
    // })
      
    let resData = await response.json()
    resData = graphqlResponseParser(resData, 200, selected.toLowerCase())
    resData = resData.result
    if (resData.length > 0) {

      data = resData

      await generateTable() 
    }
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
    <li class="text-white">
    </li>
  </ul>
  <div class="admin-control">
    Deleted
    <br>
    True
    <input type="checkbox" bind:checked={trueChecked} on:change={onCheckboxChange}>
    False
    <input type="checkbox" bind:checked={falseChecked} on:change={onCheckboxChange}>
  </div>
</div>

<style>
  .nav-link.active {
    background-color: #d63837;
  }

  a {
      color: white;
  }

  .admin-control {
    margin-top: 50px;
  }
</style>
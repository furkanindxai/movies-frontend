<script>
  import TagsInput from "../Shared/TagsInput.svelte"
  import authStore from "../../stores/authStore"
  import graphqlResponseParser from "../../../helpers/graphqlResponseParser";
  import moviesStore from "../../stores/moviesStore.js";

  let title;
  let releaseYear;
  let genres = [];
  let directors = [];
  let producers = [];
  let image;
  let imageThumbnail;
  let description;
  let responseCode = 0;
  let result;

const URL = 'http://172.25.176.79:4002/graphql'

  const handleAdd = async (e)=>{
    e.preventDefault()
    
    // const movie = {title, releaseYear, genres, directors, producers, image, imageThumbnail, description}

    let response = await fetch(URL, {
            method: 'POST',
          
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${$authStore.token}`
            },
          
            body: JSON.stringify({
              query: `mutation AddMovie {
                          addMovie(
                              movie: {
                                  title: "${title}"
                                  description: "${description}"
                                  releaseYear: ${releaseYear}
                                  producers: ${JSON.stringify(producers)}
                                  directors: ${JSON.stringify(directors)}
                                  genres: ${JSON.stringify(genres)}
                                  image: "${image}"
                                  imageThumbnail: "${imageThumbnail}"
                              }
                          ) {
                              message
                          }
                        }`
            })
        })


        response = await response.json()
        response = graphqlResponseParser(response, 200, "addMovie")
        result = response.result.message
        responseCode = response.responseCode




    // const response = await fetch("http://localhost:3000/api/v1/movies", {
    //   method: "POST", // or 'PUT'
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${$authStore.token}`
    //   },
    //   body: JSON.stringify(movie),
    //   });

    // responseCode = response.status;
    // result = await response.json();
    // result = result.message;
    if (responseCode === 201) 
    {
      title = '';
      releaseYear = '';
      genres = [];
      directors = [];
      producers = [];
      image = '';
      imageThumbnail = '';
      description = '';
      // let updatedMovies = await fetch("http://localhost:3000/api/v1/movies?limit=8&offset=0")
      // updatedMovies = await updatedMovies.json()
      // moviesStore.set(updatedMovies)
    }
  }

</script>

<button id="newMovieModalButton" type="button" class="nav-link active" data-bs-toggle="modal" data-bs-target="#newMovieModal" data-bs-whatever="@mdo" aria-current="page">+</button>

<div class="modal fade text-light" id="newMovieModal" tabindex="-1" aria-labelledby="newMovieModalLabel" aria-hidden="true"  data-bs-theme="dark">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="newMovieModalLabel">New movie</h1>
        <button id="newMovieModalCloser" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        {#if responseCode === 201}
          <div class="alert alert-success" role="alert">
            {result}
          </div>
        {:else if responseCode === 400 || responseCode === 500}
          <div class="alert alert-danger" role="alert">
            {result}
          </div>
        {/if} 
        <form on:submit={handleAdd}>
          <div class="mb-3">
            <label for="title" class="col-form-label">Title:</label>
            <input type="text" class="form-control" id="title" name="title" required bind:value={title}>
          </div>
          <div class="mb-3">
            <label for="releaseYear" class="col-form-label">Release Year:</label>
            <input type="number" class="form-control" id="releaseYear" name="releaseYear" required bind:value={releaseYear}>
          </div>
          <div class="mb-3">
            <label for="genres" class="col-form-label">Genres:</label>
            <TagsInput id='genres' inputClass="form-control" on:tags={(e)=>genres=e.detail.tags}/>
          </div>
          <div class="mb-3">
            <label for="directors" class="col-form-label">Directors:</label>
            <TagsInput id='directors' inputClass="form-control" on:tags={(e)=>producers=e.detail.tags}/>
          </div>
          <div class="mb-3">
            <label for="producers" class="col-form-label">Producers:</label>
            <TagsInput id='producers' inputClass="form-control" on:tags={(e)=>directors=e.detail.tags}/>
          </div>
          <div class="mb-3">
            <label for="image" class="col-form-label">Image URL:</label>
            <input type="text" class="form-control" id="image" name="image" required bind:value={image}>
          </div>
          <div class="mb-3">
            <label for="imageThumbnail" class="col-form-label">Thumbnail URL:</label>
            <input type="text" class="form-control" id="imageThumbnail" name="imageThumbnail" required bind:value={imageThumbnail}>
          </div>
          <div class="mb-3">
            <label for="description" class="col-form-label">Description:</label>
            <div class="form-floating">
                <textarea class="form-control" id="description" style="height: 100px" name="description" bind:value={description}></textarea>
              </div>
          </div>


          <button type="submit" class="btn btn-primary">Add</button>
        </form>
      </div>
    </div>
  </div>
</div>

<style>
    #newMovieModalButton {
        position: fixed;
        bottom: 20px; 
        right: 20px; 
        color: white;
        font-size: 4rem;
        z-index: 100;
    }

    .btn.btn-primary {
      background-color: #d63837;
      border: #d63837;
  }
</style>
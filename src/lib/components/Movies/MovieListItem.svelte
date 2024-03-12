<script>
    import graphqlResponseParser from "../../../helpers/graphqlResponseParser.js";
    export let imageThumbnail, title, releaseYear, directors, movieId, rating, type = "normal", deletedAt = false;
    import authStore from "../../stores/authStore.js";
    import postedStore from "../../stores/postedStore.js";
    import MovieEditModal from "./MovieEditModal.svelte";
    const ratingStars =  '⭐'.repeat(Math.floor(rating))

    const URL = 'http://172.25.176.79:4002/graphql'


    const onDelete = async (e) => {
      e.preventDefault()


      let response = await fetch(URL, {
            method: 'POST',
          
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${$authStore.token}`
            },
          
            body: JSON.stringify({
              query: `mutation DeleteMovie {
                        deleteMovie(id: "${movieId}")
              }`
        })
      })

      response = await response.json()



    //   const response = await fetch(`http://localhost:3000/api/v1/movies/${movieId}`, {
    //   method: "DELETE", // or 'PUT'
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": `Bearer ${$authStore.token}`
    //   }
    //   });


    let postedList = await fetch(URL, {
            method: 'POST',
          
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${$authStore.token}`
            },
          
            body: JSON.stringify({
              query: `query UserMovies {
                userMovies(type: "posted") {
                    ... on Movie {
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
                }
            }`
            })
        })

        postedList = await postedList.json()
        postedList = graphqlResponseParser(postedList, 200, "userMovies")
        postedList = postedList.result
        postedStore.set(postedList)


    //   let postedList = await fetch("http://localhost:3000/api/v1/users/me/movies?type=posted",{
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${$authStore.token}`
    //     }})
    //     postedList = await postedList.json()
    //     postedStore.set(postedList)
    }

</script>

<div class="container" id="movie-holder" data-bs-theme="dark">
    <div class="row">
        <div class="col">
                <img class="movie-image" src={`${imageThumbnail}`} alt={`poster of ${title}`}> 
        </div>

        <div class="col-8">
            <div class="text-details">
                <a href={`/movies/${movieId}`}>
                    <h6 class="movie-title">{title}</h6>
                </a>
                <p class="movie-detail">{releaseYear}</p>
                <p class="detail-label">Directors:</p>
                <p class="movie-detail">{directors}</p>
                <p class="detail-label">Rating:</p>
                <p class="movie-detail">{ratingStars}</p>
            </div>
        </div>        

    </div>
    {#if type === "posted" && !deletedAt}
        <div class="row">
            <span class="material-symbols-outlined">
                <a href="" on:click={onDelete}>
                    delete
                </a>
            </span>
            <span class="material-symbols-outlined" >
                <a href="" data-bs-toggle="modal" data-bs-target={`#movieEditModal${movieId}`}>
                    edit
                </a>
            </span>
            <MovieEditModal id={movieId} />
        </div>
    {/if}
</div>



<style>

    a {
        text-decoration: none;
        color: white;
    }
    img {
        height: 200px;
        width: 200px;
    }

    .container {
        background-color: #2b3035;
        margin-top: 10px;
        margin-bottom: 30px;
        width: 50%;
        padding: 0;
        border-radius: 2%;
        color: white;
        padding: 10px;
    }

    .text-details {
        padding: 5px;
    }

    .material-symbols-outlined {

        text-align: right;
    }

</style>
<script>
    export let movieId;
    import { onMount } from "svelte";
    import GenreTag from "./GenreTag.svelte";
    import authStore from "../../stores/authStore";
    let movieJSON = 0;
	onMount(async () => {
        const movie = await fetch(`http://localhost:3000/api/v1/movies/${movieId}`, {
                    headers: {
                    "Authorization": $authStore.roles.includes("admin") ? `Bearer ${$authStore.token}` : undefined
            }
        })
        movieJSON = await movie.json()
	});
</script>
<div class="container" id="movie-holder">
    {#if movieJSON !== 0}
        <div class="row">
            <div class="col">
                <img class="movie-image" src={`${movieJSON.image}`} alt={`image of ${movieJSON.title}`}> 
            </div>
            <div class="col">
                <div class="text-details">
                    <h3 class="movie-title">{movieJSON.title}</h3>
                    <p class="movie-detail">{movieJSON.releaseYear}</p>
                    <h5 class="detail-label">Directors:</h5>
                    <h5 class="movie-detail">{movieJSON.directors}</h5>
                    <h5 class="detail-label">Producers:</h5>
                    <h5 class="movie-detail">{movieJSON.producers}</h5>
                </div>
            </div>        
        </div>
        <div class="row">
        <div class="col">
            <ul>
                {#each movieJSON.genres as genre (genre)}
                    <GenreTag genre={genre}/>
                {/each}
            </ul>
        </div>
        </div>
        <div class="row">
        <div class="col">
            <p class="movie-detail">{movieJSON.description}</p>
        </div>
        </div>
       
    {/if}
</div>

<style>
    .col {
        padding: 0;
    }
    #movie-holder {
        margin: 30px;
    }
    div {
        position: relative;
    }
    .movie-image {
        height: 300px;
        width: 500px;
        margin-top: 30px;
        margin-bottom: 30px;
        /* display: inline; */
        border-radius: 2%;
    }
    .movie-title{
        padding-top: 20px;
        color: white;
    }

    .movie-detail {
        color: lightgray;
        margin: 0;
        padding: 0;
        margin-bottom: 10px;
        margin-top: 10px;

    }
    .detail-label {
        color: white;
        margin: 0;
        padding: 0;
    }
    .text-details {
        background-color: #2B3035;
        margin-top: 30px;
        padding: 20px;
        border-radius: 2%;
        
    }
    ul {
        padding: 0;
    }
</style>
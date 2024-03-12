<script>

    import {onMount} from "svelte"
    import MovieCard from "./MovieCard.svelte";
    import NewMovieModal from "./NewMovieModal.svelte"
    import authStore from "../../stores/authStore"
    import moviesStore from "../../stores/moviesStore" 
    import moviesOffsetStore  from "../../stores/moviesOffsetStore.js"
    import graphqlResponseParser from "../../../helpers/graphqlResponseParser"
    let loading = false;
 

    const URL = 'http://172.25.176.79:4002/graphql'

    async function fetchMoreMovies() {
        moviesOffsetStore.update(value=>value+8)
        let moviesList = await fetch(URL, {
            method: 'POST',
          
            headers: {
              "Content-Type": "application/json"
 
            },
          
            body: JSON.stringify({
              query: `query Movies {
                movies(params: { limit: 8, offset: ${$moviesOffsetStore} }) {
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


        moviesList = await moviesList.json()
        moviesList = graphqlResponseParser(moviesList, 200, "movies")
        moviesList = moviesList.result
        moviesStore.update(movies=>[...movies, ...moviesList])
        loading = false;





        // let moviesList = await fetch(`http://localhost:3000/api/v1/movies?limit=8&offset=${$moviesOffsetStore}`)
        // moviesList = await moviesList.json()
        // moviesStore.update(movies=>[...movies, ...moviesList])
        // loading = false;
  }


    function handleScroll() {
        const scrollY = window.scrollY
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollY + windowHeight >= documentHeight - 200 && !loading) {
            loading = true;
            fetchMoreMovies();
        }
    }

    onMount(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
  });


</script>

{#if $authStore.isAuth === 1}
    <NewMovieModal />
{/if}
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 w-100" data-bs-theme="dark">
    {#each $moviesStore as movie}
        <div class="col d-flex justify-content-center">
            <a href={`/movies/${movie.id}`}>
                <MovieCard title={movie.title} releaseYear={movie.releaseYear} 
                rating={Math.floor(movie.averageRating)} imageUrl={movie.imageThumbnail ? movie.imageThumbnail : undefined}/>
            </a>
        </div>
    {/each} 
</div>
<style>
a {
    text-decoration: none;
}
</style>
<script>

    import {onMount} from "svelte"
    import MovieCard from "./MovieCard.svelte";
    import NewMovieModal from "../components/NewMovieModal.svelte"
    import authStore from "../stores/authStore.js";
    import moviesStore from "../stores/moviesStore.js"    
    import moviesOffsetStore  from "../stores/moviesOffsetStore.js"

    let loading = false;
 
    async function fetchMoreMovies() {
        moviesOffsetStore.update(value=>value+8)
        let moviesList = await fetch(`http://localhost:3000/api/v1/movies?limit=8&offset=${$moviesOffsetStore}`)
        moviesList = await moviesList.json()
        moviesStore.update(movies=>[...movies, ...moviesList])
        loading = false;
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
                    <MovieCard title={movie.title} releaseYear={movie.releaseYear} rating={Math.floor(movie.averageRating)} imageUrl={movie.imageThumbnail ? movie.imageThumbnail : undefined}/>
                </a>
            </div>
        {/each}

</div>
<style>

    a {
        text-decoration: none;
    }
</style>
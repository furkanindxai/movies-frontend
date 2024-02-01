<script>

    import MovieCard from "./MovieCard.svelte";
    import NewMovieModal from "../components/NewMovieModal.svelte"
    import authStore from "../stores/authStore";
    import moviesStore from "../stores/moviesStore"    

</script>

{#if $authStore.isAuth === 1}
    <NewMovieModal />
{/if}
<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 w-100" data-bs-theme="dark">

    <!-- {#if moviesList.length > 0}
        {#each moviesList as movie (movie.id)}
            <div class="col d-flex justify-content-center">
                <MovieCard title={movie.title} releaseYear={movie.releaseYear} rating={Math.floor(movie.averageRating)} imageUrl={movie.imageThumbnail ? movie.imageThumbnail : undefined}/>
            </div>
        {/each}
    {/if} -->
   
        <!-- <p style="color: red;">...loading</p> -->

        {#each $moviesStore as movie (movie.id)}
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
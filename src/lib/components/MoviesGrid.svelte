<script>
    export let moviesList;
    import MovieCard from "./MovieCard.svelte";
</script>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 w-100" data-bs-theme="dark">
    {#each moviesList as movie (movie.id)}
        <div class="col d-flex justify-content-center">
            <MovieCard title={movie.title} releaseYear={movie.releaseYear} rating={Math.floor(movie.averageRating)}/>
        </div>
    {/each}

  </div>
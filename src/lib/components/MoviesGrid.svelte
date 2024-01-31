<script>
    import MovieCard from "./MovieCard.svelte";
    import { onMount } from 'svelte';
    
    let moviesList = [];

	onMount(async () => {
        moviesList = await fetch("http://localhost:3000/api/v1/movies/")
        moviesList = await moviesList.json()
	});

</script>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 w-100" data-bs-theme="dark">
    {#if moviesList.length > 0}
        {#each moviesList as movie (movie.id)}
            <div class="col d-flex justify-content-center">
                <MovieCard title={movie.title} releaseYear={movie.releaseYear} rating={Math.floor(movie.averageRating)} imageUrl={movie.imageThumbnail ? movie.imageThumbnail : undefined}/>
            </div>
        {/each}
    {/if}

  </div>
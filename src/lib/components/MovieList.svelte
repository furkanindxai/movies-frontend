<script>
    export let movies = []
    export let type = "normal"
    import MovieListItem from "./MovieListItem.svelte";
    import postedStore from "../stores/postedStore.js";
</script>

<ul>

    {#if type === "posted"}
        {#each $postedStore as movie}
            <li>
                    <MovieListItem title={type === "rated" ? movie.Movie.title: movie.title} 
                    imageThumbnail={type === "rated" ? movie.Movie.imageThumbnail:movie.imageThumbnail} 
                    releaseYear={type === "rated" ? movie.Movie.releaseYear:movie.releaseYear} 
                    directors={type === "rated" ? movie.Movie.directors:movie.directors} 
                    movieId={type === "rated" ? movie.Movie.id:movie.id}
                    rating={type === "rated" ? movie.rating :movie.averageRating} {type}/>

            </li>
        {/each}
        {:else}
            {#each movies as movie}
                <li>
                        <MovieListItem title={type === "rated" ? movie.Movie.title: movie.title} 
                        imageThumbnail={type === "rated" ? movie.Movie.imageThumbnail:movie.imageThumbnail} 
                        releaseYear={type === "rated" ? movie.Movie.releaseYear:movie.releaseYear} 
                        directors={type === "rated" ? movie.Movie.directors:movie.directors} 
                        movieId={type === "rated" ? movie.Movie.id:movie.id}
                        rating={type === "rated" ? movie.rating :movie.averageRating} {type}/>
            
                </li>
            {/each}
    {/if}
</ul>


<style>
    ul {
        list-style: none;
    }

</style>
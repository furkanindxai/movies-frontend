<script>
    import { page } from '$app/stores';
    import MovieDetails from '../../../lib/components/MovieDetails.svelte';    
    import Reviews from '../../../lib/components/Reviews.svelte';
    import SearchBox from "../../../lib/components/SearchBox.svelte"

    let movieId = $page.params.id;

</script>
<SearchBox />
<MovieDetails {movieId} />
<Reviews movieId={movieId}/>

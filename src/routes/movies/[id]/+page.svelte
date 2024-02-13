<script>
    import { page } from '$app/stores';
    import MovieDetails from "../../../lib/components/Movies/MovieDetails.svelte"
    import Reviews from '../../../lib/components/Movies/Reviews/Reviews.svelte'
    import SearchBox from '../../../lib/components/Shared/SearchBox.svelte';
    let movieId = $page.params.id;
</script>

<SearchBox />
<MovieDetails {movieId} />
<Reviews movieId={movieId}/>

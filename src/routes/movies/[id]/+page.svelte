<script>
    import { page } from '$app/stores';
    import MovieDetails from '../../../lib/components/MovieDetails.svelte';    
    import ReviewBox from '../../../lib/components/ReviewBox.svelte';    
    let id = $page.params.id;

</script>
<MovieDetails {id} />
<ReviewBox />
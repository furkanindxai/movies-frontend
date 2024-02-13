<script>
    import MovieList from "../../lib/components/Movies/MovieList.svelte"
    import movieSearchResultsStore from "../../lib/stores/movieSearchResultsStore.js"
    import AdvancedSearch from "../../lib/components/Search/AdvancedSearch.svelte";
</script>

<AdvancedSearch />
<h3 style="text-align: center; color: white; margin: 20px;">
    Search results...
</h3>
{#if $movieSearchResultsStore.length > 0}
        <MovieList movies={$movieSearchResultsStore}/>
{/if}

<style>

</style>
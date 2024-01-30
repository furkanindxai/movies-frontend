<script>
    export let data;
    import SearchBox from "../lib/components/SearchBox.svelte";
    import MoviesGrid from "../lib/components/MoviesGrid.svelte";
</script>

<SearchBox />
<MoviesGrid moviesList={data.movies}/>
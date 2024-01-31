<script>
    import authStore from "../lib/stores/authStore";
    import SearchBox from "../lib/components/SearchBox.svelte";
    import MoviesGrid from "../lib/components/MoviesGrid.svelte";
    import GreetingText from "../lib/components/GreetingText.svelte";
    import NewMovieModal from "../lib/components/NewMovieModal.svelte"
</script>

<SearchBox />
<GreetingText />
<MoviesGrid />
{#if $authStore.isAuth === 1}
    <NewMovieModal />
{/if}
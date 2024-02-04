import { writable } from 'svelte/store';

const movieSearchResultsStore = writable([]);

export default movieSearchResultsStore;
import { writable } from 'svelte/store';

let moviesList = await fetch("http://localhost:3000/api/v1/movies?limit=8&offset=0")
moviesList = await moviesList.json()

const moviesStore = writable(moviesList);
export default moviesStore
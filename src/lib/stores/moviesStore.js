import { writable } from 'svelte/store';

let moviesList = await fetch("http://localhost:3000/api/v1/movies/")
moviesList = await moviesList.json()

const moviesStore = writable(moviesList);
export default moviesStore
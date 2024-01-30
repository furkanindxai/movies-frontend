export async function load() {
    let movies = await fetch("http://localhost:3000/api/v1/movies/")
    movies = await movies.json()
	return {
	    movies
	};
}

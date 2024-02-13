const URL = `http://localhost:3000/api/v1/movies`

export const getMovieService = async (movieId, roles, token) => {
    try {
        let movie = await fetch(`${URL}/${movieId}`, {
            headers: {
                "Authorization": roles.includes("admin") ?
                `Bearer ${token}` : undefined
            }
        })
        movie = await movie.json()
        return movie
    }
    catch (e) {
        console.log(e)
    }
}
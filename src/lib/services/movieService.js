import graphqlResponseParser from "../../helpers/graphqlResponseParser"

const URL = 'http://172.25.176.79:4002/graphql'

export const getMovieService = async (movieId, roles, token) => {
    try {

        let movie = await fetch(URL, {
            method: 'POST',
          
            headers: {
              "Content-Type": "application/json",
              "Authorization": roles.includes("admin") ?
              `Bearer ${token}` : undefined
            },
          
            body: JSON.stringify({
              query: `query Movie {
                movie(id: "${movieId}") {
                    id
                    poster
                    title
                    directors
                    producers
                    genres
                    releaseYear
                    description
                    averageRating
                    imageThumbnail
                    image
                    createdAt
                    updatedAt
                    deletedAt
                }
            }`
            })
        })


        movie = await movie.json()
        movie = graphqlResponseParser(movie, 200, "movie")
        movie = movie.result
        return movie

        // let movie = await fetch(`${URL}/${movieId}`, {
        //     headers: {
        //         "Authorization": roles.includes("admin") ?
        //         `Bearer ${token}` : undefined
        //     }
        // })
    }
    catch (e) {
        console.log(e)
    }
}
import { writable } from 'svelte/store';
import graphqlResponseParser from '../../helpers/graphqlResponseParser';

const URL = 'http://172.25.176.79:4002/graphql'

let moviesList = await fetch(URL, {
    method: 'POST',
  
    headers: {
      "Content-Type": "application/json"

    },
  
    body: JSON.stringify({
      query: `query Movies {
        movies(params: { limit: 8, offset: 8 }) {
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


moviesList = await moviesList.json()
moviesList = graphqlResponseParser(moviesList, 200, "movies")
moviesList = moviesList.result

// let moviesList = await fetch("http://localhost:3000/api/v1/movies?limit=8&offset=0")
// moviesList = await moviesList.json()

const moviesStore = writable(moviesList);
export default moviesStore
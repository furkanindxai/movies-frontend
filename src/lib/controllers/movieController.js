import { getMovieService } from "../services/movieService";
class MovieController {
    constructor() {
        if (MovieController.instance) {
            return MovieController.instance
        }
        else {
            MovieController.instance = this
        }
    }

    async getMovieController(movieId, roles, token) {
        const movie = await getMovieService(movieId, roles, token)
        return movie
    }

    async handleMovieUpdateController(id, token) {
        
    }

}

const movieControllerInstance = new MovieController();
export default movieControllerInstance;
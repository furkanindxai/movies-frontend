<script>
    import { goto } from '$app/navigation';
    import movieSearchResultsStore from "../../stores/movieSearchResultsStore.js"
    import authStore from '../../stores/authStore.js';
    import graphqlResponseParser from "../../../helpers/graphqlResponseParser.js"

    export let handleSearch = async (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {

            let moviesList = await fetch('http://172.25.176.79:4002/graphql', {
                method: 'POST',
                
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": $authStore.roles.includes("admin") ? `Bearer ${$authStore.token}` : undefined
                },
                
                body: JSON.stringify({
                    query: `query Movies {
                        movies(params: { keyword: "${e.target.value}" }) {
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
            })})

            moviesList = await moviesList.json()

            moviesList = graphqlResponseParser(moviesList, 200, "movies")


            // let moviesList = await fetch(`http://localhost:3000/api/v1/movies?keyword=${e.target.value}`, {
            //     headers: {
            //     "Authorization": $authStore.roles.includes("admin") ? `Bearer ${$authStore.token}` : undefined
            // }
            // })
            // moviesList = await moviesList.json()
            movieSearchResultsStore.set(moviesList.result)
                // goto(`/search?keyword=${e.target.value}`)
            goto(`/search`)
        }
    }
</script>
<div>
    <div class="inner-div-search" data-bs-theme="dark">

        <input class="form-control" type="search" placeholder="Search" aria-label="Search" on:keydown={handleSearch}>

    </div>
</div>


<style>
    div {
        margin: 30px;
    }

    .inner-div-search {
        width: 35%;
        margin: auto;
        
    }
    input {
        background-color: #2B3035;
        border: 0px;
        color: #B4B4B8;
    }
    input:focus {
        background-color: #2B3035;
        border: 0px;
        color: #B4B4B8;
    }

    ::placeholder {
        color: #B4B4B8;
    }
</style>

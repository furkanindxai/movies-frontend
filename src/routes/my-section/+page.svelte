<script>
    import Tabs from "../../lib/components/MySection/Tabs.svelte";
    import {onMount} from "svelte"
    import authStore from "../../lib/stores/authStore";
    import postedStore from "../../lib/stores/postedStore.js"
    import { goto } from '$app/navigation';
    import userControllerInstance from "../../lib/controllers/userController.js"

    let userPostedMovies = []
    let userRatedMovies = []

    onMount(async () => {
        if ($authStore.isAuth === 0) goto("/")
        else {
            const response = await userControllerInstance.getUserMoviesController($authStore.token)
            userPostedMovies = response.postedList
            userRatedMovies = response.ratedList
            postedStore.set(userPostedMovies)

        }
    })
</script>

<Tabs {userRatedMovies}/>
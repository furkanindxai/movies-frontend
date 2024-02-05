<script>
    import Tabs from "../../lib/components/Tabs.svelte";
    import {onMount} from "svelte"
    import authStore from "../../lib/stores/authStore";
    import postedStore from "../../lib/stores/postedStore.js"
    import { goto } from '$app/navigation';

    let userPostedMovies = []
    let userRatedMovies = []

    onMount(async () => {
        if ($authStore.isAuth === 0) goto("/")
        else {
            let postedList = await fetch("http://localhost:3000/api/v1/users/me/movies?type=posted",{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${$authStore.token}`
            }})
            let ratedList = await fetch("http://localhost:3000/api/v1/users/me/movies?type=rated",{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${$authStore.token}`
            }})
            userPostedMovies = await postedList.json()
            userRatedMovies = await ratedList.json()
            postedStore.set(userPostedMovies)

        }
    })
</script>

<Tabs {userRatedMovies}/>
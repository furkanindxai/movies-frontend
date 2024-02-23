<script>
    export let movieId;
    import authStore from "../../../stores/authStore";
    import ReviewBox from "./ReviewBox.svelte";
    import Review from "./Review.svelte";
    import {onMount} from "svelte"

    let otherReviews = []
    let myReview = {
        rating: 0,
        review: ''
    };
    onMount(async () => {
        const ratings = await fetch(`http://localhost:3000/api/v1/movies/${movieId}/ratings`,{
            headers: {
                    "Authorization": $authStore.roles.includes("admin") ? `Bearer ${$authStore.token}` : undefined
            }
        })
        otherReviews = await ratings.json()
        myReview = otherReviews.find(rating => rating.userId === $authStore.id)
        if (!myReview) myReview = {
            rating: 0,
            review: ''
        };
        if (myReview && !myReview.review) myReview.review = ''
        otherReviews = otherReviews.filter(rating=>rating.userId !== $authStore.id)        
	});
</script>

{#if $authStore.isAuth === 1}
    <ReviewBox movieId={movieId} {myReview}/>
{/if}

{#if otherReviews.length > 0}
    <h4 class="review-heading">Other reviews:</h4>

    {#each otherReviews as review}
        <Review rating={review.rating} review={review.review} poster={review.userId} id={review.id}/>
    {/each}
{/if}

<style>
        .review-heading {
        display: inline-block;
        margin-bottom: 3px;
        margin-left: 30px;
        color: white;
    }
</style>

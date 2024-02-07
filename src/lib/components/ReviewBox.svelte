<script>
    export let movieId;
    export let myReview;

    import authStore from "../stores/authStore.js";
    import StarRating from "./StarRating.svelte";

    let responseCode = 0;

    async function submitReview(e) {
        const review = {rating: myReview.rating, review: myReview.review}
        const response = await fetch(`http://localhost:3000/api/v1/movies/${movieId}/ratings`, {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${$authStore.token}`
        },
        body: JSON.stringify(review),
        });

        responseCode = response.status;
        result = await response.json();

    }

  </script>
  

<h4 class="review-heading"> Your review:</h4>
  
<div class="container"> 

    <form on:submit={submitReview}>
        {#if responseCode === 201}
            <div class="alert alert-success" role="alert" data-bs-theme="dark">
            Posted!
            </div>
        {:else if responseCode >= 400}
            <div class="alert alert-danger h" role="alert" data-bs-theme="dark">
            Failed!
            </div>
        {/if} 
        <div class="mb-3">
        <label class="form-label">Rating:</label>
        <StarRating bind:rating={myReview.rating}/>
        </div>
    
        <div class="mb-3">
        <label class="form-label">Review:</label>
            <textarea class="form-control" rows="3" bind:value={myReview.review} data-bs-theme="dark"></textarea>
        </div>
    
        <button type="button" class="btn btn-primary" on:click={submitReview}>Post</button>
    </form>
    
</div>

<style>

    .btn.btn-primary {
        background-color: #d63837;
        border: #d63837;
    }

    .container {
        width: 30%;
        padding: 20px;
        margin: 30px;
        margin-top: 5px;
        background-color: #2B3035;
        border-radius: 2%;
        color: #D3D3D3;
    }

    .review-heading {
        display: inline-block;
        margin-bottom: 3px;
        margin-left: 30px;
        color: white;
    }
</style>

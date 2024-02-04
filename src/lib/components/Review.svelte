<script>
    export let rating;
    export let review;
    export let poster;
    const ratingStars = '⭐'.repeat(rating)

</script>

<div class="container">
    <h5>
        User {poster}
    </h5>
    <div>
        {ratingStars}
    </div>
    {review}
</div>

<style>
    .container {
        width: 30%;
        padding: 20px;
        margin: 30px;
        margin-top: 5px;
        background-color: #2B3035;
        border-radius: 2%;
        color: #D3D3D3;
    }
</style>
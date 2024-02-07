<script>
    export let rating;
    export let review;
    export let id;
    export let poster = "(anonymous)";
    const ratingStars = '⭐'.repeat(rating)

    import authStore from "../stores/authStore";
</script>

<div class="container">
    {#if $authStore.roles.includes("admin")}
        <p>
            Review ID: {id}
        </p>
    {/if}
    <h5>
        User {poster}
    </h5>
    <div>
        {ratingStars}
    </div>
    {#if review}
        {review}
    {/if}
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
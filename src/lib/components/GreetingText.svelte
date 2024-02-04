<script>
    import authStore from "../stores/authStore.js";
</script>
<h1>
    {#if $authStore.isAuth === 1}
        <p class="fw-lighter">
            Welcome, {$authStore.email}!
        </p>
    {/if}
</h1>

<style>
    p {
        color: white;
        margin-left: 1.5em;
        margin-bottom: 1em;
        font-size: 1.7rem;
    }
</style>
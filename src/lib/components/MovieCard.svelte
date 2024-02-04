<script>
  export let imageUrl;
  export let title = 'Oppenheimer';
  export let rating = 5;
  export let releaseYear = 2024;
  const ratingStars = '⭐'.repeat(rating)
</script>

<div class="card" style="width: 17rem;">
    <img src={imageUrl} class="card-img-top" alt="the movie thumbnail">
    <div class="card-body">
      <h5 class="card-title">{title}</h5>
      <p class="card-text">{releaseYear}</p>
      <p class="card-text">{ratingStars}</p> 
    </div>
</div>

<style>
  .card {
    margin-bottom: 30px;
    border-radius: 3%;
    
  }

  .card-img-top {
    height: 320px;
    border-radius: 3%;
  }
</style>
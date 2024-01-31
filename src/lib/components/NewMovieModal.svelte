<script>
  import TagsInput from "./TagsInput.svelte";

  let title;
  let releaseYear;
  let genres = [];
  let directors = [];
  let producers = [];
  let image;
  let imageThumbnail;
  let description;
  let responseCode = 0;
  let result;
  const handleAdd = async (e)=>{
    e.preventDefault()

    // const user = {email, password}
    // const response = await fetch("http://localhost:3000/api/v1/auth/signin", {
    //   method: "POST", // or 'PUT'
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(user),
    //   });

    // responseCode = response.status;
    // result = await response.json();
    // if (responseCode === 200) 
    // {
    //     const closeButton = document.getElementById('signInModalCloser')
    //     closeButton.click()
    //     authStore.set({...result, isAuth: 1})
    //     window.localStorage.setItem('authState',JSON.stringify($authStore))
    //     email = ''
    //     password = ''
 
    // }
    // else {
    //   result = result.message;
    // }
  }

</script>

<button id="newMovieModalButton" type="button" class="nav-link active" data-bs-toggle="modal" data-bs-target="#newMovieModal" data-bs-whatever="@mdo" aria-current="page">+</button>

<div class="modal fade text-light" id="newMovieModal" tabindex="-1" aria-labelledby="newMovieModalLabel" aria-hidden="true"  data-bs-theme="dark">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="newMovieModalLabel">New movie</h1>
        <button id="newMovieModalCloser" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        <form>
          <div class="mb-3">
            <label for="title" class="col-form-label">Title:</label>
            <input type="text" class="form-control" id="title" name="title" required bind:value={title}>
          </div>
          <div class="mb-3">
            <label for="releaseYear" class="col-form-label">Release Year:</label>
            <input type="number" class="form-control" id="releaseYear" name="releaseYear" required bind:value={releaseYear}>
          </div>
          <div class="mb-3">
            <label for="genres" class="col-form-label">Genres:</label>
            <TagsInput id='genres' inputClass="form-control"/>
          </div>
          <div class="mb-3">
            <label for="directors" class="col-form-label">Directors:</label>
            <TagsInput id='directors' inputClass="form-control"/>
          </div>
          <div class="mb-3">
            <label for="producers" class="col-form-label">Producers:</label>
            <TagsInput id='producers' inputClass="form-control"/>
          </div>
          <div class="mb-3">
            <label for="image" class="col-form-label">Image URL:</label>
            <input type="text" class="form-control" id="image" name="image" required bind:value={image}>
          </div>
          <div class="mb-3">
            <label for="imageThumbnail" class="col-form-label">Thumbnail URL:</label>
            <input type="text" class="form-control" id="imageThumbnail" name="imageThumbnail" required bind:value={imageThumbnail}>
          </div>
          <div class="mb-3">
            <label for="description" class="col-form-label">Description:</label>
            <div class="form-floating">
                <textarea class="form-control" id="description" style="height: 100px" name="description" bind:value={description}></textarea>
              </div>
          </div>


          <button type="submit" class="btn btn-primary">Add</button>
        </form>
      </div>
    </div>
  </div>
</div>

<style>
    #newMovieModalButton {
        position: fixed;
        bottom: 20px; 
        right: 20px; 
        color: white;
        font-size: 4rem;
    }
</style>
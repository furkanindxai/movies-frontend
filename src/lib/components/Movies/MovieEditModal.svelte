<script>
    import authStore from "../../stores/authStore";
    import postedStore from "../../stores/postedStore";
    let imageThumbnail;
    let image;
    let description;
    let responseCode = 0;
    export let id;
    const handleUpdate = async (e)=>{
      e.preventDefault()
   
      if (imageThumbnail && image ) {
        const response = await fetch(`http://localhost:3000/api/v1/movies/${id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${$authStore.token}`
            },
            body: JSON.stringify({
                image,
                imageThumbnail
            }),
            });
        responseCode = response.status
      }
      if (description) {
        const response = await fetch(`http://localhost:3000/api/v1/movies/${id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${$authStore.token}`
            },
            body: JSON.stringify({
                description
            }),
            });
        responseCode = response.status
      }
      if (description || (image && imageThumbnail)) {
          let postedList = await fetch("http://localhost:3000/api/v1/users/me/movies?type=posted",{
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${$authStore.token}`
            }})
            postedList = await postedList.json()
            postedStore.set(postedList)
      }
      image = ''
      imageThumbnail = ''
      description = ''
  
    }
  </script>
  
  <div class="modal fade text-light" id={`movieEditModal${id}`} tabindex="-1" aria-labelledby={`movieEditModal${id}Label`} aria-hidden="true" data-bs-theme='dark'>
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id={`movieEditModal${id}Label`}>Update</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {#if responseCode === 204}
            <div class="alert alert-success" role="alert">
              Updated!
            </div>
          {:else if responseCode >= 400}
            <div class="alert alert-danger" role="alert">
              Failed!
            </div>
          {/if} 
          <form on:submit={handleUpdate}>
            <div class="mb-3">
              <label for="image" class="col-form-label">Image:</label>
              <input type="text" class="form-control"  name="image" bind:value={image} >
            </div>
            <div class="mb-3">
              <label for="thumbnail" class="col-form-label">Image Thumbnail:</label>
              <input type="text" class="form-control"  name="thumbnail" bind:value={imageThumbnail} >
            </div>
            <div class="mb-3">
              <label for="description" class="col-form-label">Description:</label>
              <input type="textArea" class="form-control"  name="description" bind:value={description} >
            </div>
           
            <button type="submit" class="btn btn-primary">Update</button>
          </form>
        </div>
  
      </div>
    </div>
  </div>
  
  <style>
        .btn.btn-primary {
          background-color: #d63837;
          border: #d63837;
      }
  </style>
  
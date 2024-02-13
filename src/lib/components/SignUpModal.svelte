<script>
  import authControllerInstance from "../controllers/authController.js"

  let email;
  let password;
  let responseCode = 0;
  let result;
  const handleSignUp = async (e)=>{
    e.preventDefault()

    const response = await authControllerInstance.signUpController(email, password)
    responseCode = response.responseCode
    result = response.result.message   
    if (responseCode === 201) {
        email = ''
        password = ''
    }
  }
</script>

<div class="modal fade text-light" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-theme='dark'>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Sign up</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        {#if responseCode === 201}
          <div class="alert alert-success" role="alert">
            {result}
          </div>
        {:else if responseCode === 400 || responseCode === 500}
          <div class="alert alert-danger" role="alert">
            {result}
          </div>
        {/if} 
        <form on:submit={handleSignUp}>
          <div class="mb-3">
            <label for="email" class="col-form-label">Email:</label>
            <input type="email" class="form-control" id="email" name="email" bind:value={email} required>
          </div>
          <div class="mb-3">
            <label for="password" class="col-form-label">Password:</label>
            <input type="password" class="form-control" id="password" name="password" bind:value={password} required>
          </div>
          <button type="submit" class="btn btn-primary">Sign up</button>
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

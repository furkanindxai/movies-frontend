<script>
  import authStore from "../stores/authStore"

  let email;
  let password;
  let responseCode = 0;
  let result;
  const handleSignIn = async (e)=>{
    e.preventDefault()

    const user = {email, password}
    const response = await fetch("http://localhost:3000/api/v1/auth/signin", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      });

    responseCode = response.status;
    result = await response.json();
    if (responseCode === 200) 
    {
        const closeButton = document.getElementById('signInModalCloser')
        closeButton.click()
        authStore.set({...result, isAuth: 1})
        window.localStorage.setItem('authState',JSON.stringify($authStore))
        email = ''
        password = ''
 
    }
    else {
      result = result.message;
    }
  }
</script>

<div class="modal fade text-light" id="signInModal" tabindex="-1" aria-labelledby="signInModalLabel" aria-hidden="true" data-bs-theme='dark'>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="signInModalLabel">Sign in</h1>
        <button id="signInModalCloser" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        {#if responseCode > 400}
          <div class="alert alert-danger" role="alert">
            {result}
          </div>
      {/if} 
        <form on:submit={handleSignIn}>
          <div class="mb-3">
            <label for="signin-email" class="col-form-label">Email:</label>
            <input type="email" class="form-control" id="signin-email" name="signin-email" bind:value={email} required>
          </div>
          <div class="mb-3">
            <label for="signin-password" class="col-form-label">Password:</label>
            <input type="password" class="form-control" id="signin-password" name="signin-password" bind:value={password} required>
          </div>
          <button type="submit" class="btn btn-primary">Sign in</button>
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
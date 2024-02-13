<script>
    let newPassword, oldPassword, confirmPassword, responseCode, result, newEmail;
    import { goto } from '$app/navigation';

    
    import authStore from "../../stores/authStore";
    import userControllerInstance from "../../controllers/userController"

    const handlePasswordChange = async (e)=>{
        e.preventDefault()

        const response = await userControllerInstance.handlePasswordChangeController($authStore.token, oldPassword, newPassword, confirmPassword)
        if (response.responseCode === 204) {
            oldPassword = ''
            newPassword = ''
            confirmPassword = ''
        }
        responseCode = response.responseCode
        result = response.result.message
  }
    const handleEmailChange = async (e)=>{
        e.preventDefault()

        const response = await userControllerInstance.handleEmailChangeController($authStore.token, newEmail)
        responseCode = response.responseCode
        result = response.result.message
        if (responseCode === 204) 
        {
            newEmail = ''
        }
  }

    const handleDelete = async (e)=>{
        e.preventDefault()
        const response = await userControllerInstance.handleDeleteController($authStore.token)
        responseCode = response.responseCode;
        if (responseCode === 204) {
            window.localStorage.clear()
            authStore.set({email:'',token:'', userId:'', roles:'', isAuth: 0})
            goto('/')

        }
        else result = response.result.message
  }

</script>

<div class="container">
    {#if responseCode === 204}
        <div class="alert alert-success" role="alert">
        {result}
        </div>
    {:else if responseCode >= 400}
        <div class="alert alert-danger" role="alert">
        {result}
        </div>
    {/if} 
    <div>
        <h4>Change your password</h4>
        
            <form on:submit={handlePasswordChange}>
                <div class="mb-3">
                  <label for="oldPassword" class="form-label">Old password</label>
                  <input name="oldPassword" type="password" class="form-control" id="oldPassword" bind:value={oldPassword}>
                </div>
                <div class="mb-3">
                  <label for="newPassword" class="form-label">New password</label>
                  <input type="password" class="form-control" id="newPassword" name="newPassword" bind:value={newPassword}>
                </div>
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm password</label>
                  <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" bind:value={confirmPassword} />
                </div>

                <button class="btn btn-primary" type="submit">Update</button>
              </form>
        

    </div>
    <br>
    <br>
    
    <div>
        <h4>Update email</h4>        
            <form on:submit={handleEmailChange}>
                <div class="mb-3">
                  <label for="newEmail" class="form-label">New email:</label>
                  <input name="newEmail" type="email" class="form-control" id="newEmail" bind:value={newEmail}>
                </div>
              

                <button class="btn btn-primary" type="submit">Update</button>
              </form>
    </div>

    <br>
    <br>

    <div>
        <h4>Delete account</h4>        
            <form on:submit={handleDelete}>
                <p>You'll have to contact the admin to reactivate your account!</p>
                <button class="btn btn-primary" type="submit">Delete</button>
            </form>
    </div>
</div>

<style>
    .container {
        color: white;
        width: 30%;
    }

    h4 {
        margin-bottom: 15px;
    }

    button {
        background-color: #d63837;
        border: none;
    }

    button:hover {
        background-color: #d63837;
    }

</style>
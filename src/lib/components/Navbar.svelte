<script>
    import authStore from "../stores/authStore.js";
    import { goto } from '$app/navigation';

    const handleSignOut = () => {
      authStore.set({email:'',token:'', userId:'', roles:'', isAuth: 0})
      window.localStorage.clear()
      goto('/')
    }
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top" data-bs-theme="dark">
  <div class="container-fluid">
    <img src='https://cdn-icons-png.flaticon.com/512/2503/2503508.png' alt='logo' style="height: 40px; padding:5px">
    <a class="navbar-brand" href="/">MoviesDB</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      {#if $authStore.isAuth === 0}
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <button type="button" class="nav-link active" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" aria-current="page">Sign up</button>
          </li>
          <li class="nav-item">
            <button type="button" class="nav-link active" data-bs-toggle="modal" data-bs-target="#signInModal" data-bs-whatever="@mdo" aria-current="page">Sign in</button>
          </li>
        </ul>
      {:else if $authStore.isAuth === 1}
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          
          <li class="nav-item">
            <a type="button" class="nav-link active" aria-current="page" href="/my-section">My section</a>
          </li>
          {#if $authStore.roles.includes("admin")}
            <li class="nav-item">
              <a type="button" class="nav-link active" aria-current="page" href="/admin">Admin</a>
            </li>
          {/if}
          <li class="nav-item">
            <button type="button" class="nav-link active" aria-current="page" on:click={handleSignOut}>Sign out</button>

          </li>
        </ul>
      {/if}

    </div>
  </div>
</nav>

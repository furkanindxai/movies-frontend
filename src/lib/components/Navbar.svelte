<script>
    import SignUpModal from "./SignUpModal.svelte";
    import SignInModal from "./SignInModal.svelte";
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div class="container-fluid">
    <img src='https://cdn-icons-png.flaticon.com/512/2503/2503508.png' alt='logo' style="height: 40px; padding:5px">
    <a class="navbar-brand" href="#">MoviesDB</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <SignUpModal />
        </li>
        <li class="nav-item">
            <SignInModal />
        </li>
 

      </ul>

    </div>
  </div>
</nav>
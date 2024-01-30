<button type="button" class="nav-link active" data-bs-toggle="modal" data-bs-target="#signInModal" data-bs-whatever="@mdo" aria-current="page">Sign in</button>

<div class="modal fade text-light" id="signInModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Sign in</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="signup-email" class="col-form-label">Email:</label>
            <input type="email" class="form-control" id="signup-email">
          </div>
          <div class="mb-3">
            <label for="signup-password" class="col-form-label">Password:</label>
            <input type="password" class="form-control" id="signup-password">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Sign in</button>
      </div>
    </div>
  </div>
</div>
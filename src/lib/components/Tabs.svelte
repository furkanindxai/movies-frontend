<script>
    import MovieList from "../components/MovieList.svelte"
    import Settings from "./Settings.svelte";
    export let userRatedMovies;
</script>
<div class="container">
    <ul class="nav nav-tabs" id="myTab" role="tablist" data-bs-theme="dark">
        <li class="nav-item" role="presentation">
          <a class="nav-link active" href="" id="posted-tab" data-bs-toggle="tab" data-bs-target="#posted-tab-pane" 
          role="tab" aria-controls="posted-tab-pane" aria-selected="true">Posted</a>
        </li>
        <li class="nav-item" role="presentation">
          <a class="nav-link" href="" id="rated-tab" data-bs-toggle="tab" data-bs-target="#rated-tab-pane"  
          role="tab" aria-controls="rated-tab-pane" aria-selected="false">Rated</a>
        </li>
        <li class="nav-item" role="presentation">
          <a class="nav-link" href="" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings-tab-pane"  
          role="tab" aria-controls="settings-tab-pane" aria-selected="false">Settings</a>
        </li>
    
      
    </ul>
</div>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="posted-tab-pane" role="tabpanel" aria-labelledby="posted" tabindex="0"><MovieList type="posted"/></div>
        <div class="tab-pane fade" id="rated-tab-pane" role="tabpanel" aria-labelledby="rated-tab" tabindex="0"><MovieList movies={userRatedMovies} type="rated"/></div>
        <div class="tab-pane fade" id="settings-tab-pane" role="tabpanel" aria-labelledby="settings-tab" tabindex="0"><Settings /></div>
    </div>


<style>
    a {
        color: white;
        text-decoration: none;
    } 
    .container {
        margin-top: 80px;
    }
    .tab-content {
        padding: 20px;
    }
</style>
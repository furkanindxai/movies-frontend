<script>
    import SearchBox from "./SearchBox.svelte";
    import TagsInput from "./TagsInput.svelte";
    import Dropdown from "./Dropdown.svelte";
    import { goto } from '$app/navigation';
    import authStore from "../stores/authStore.js"
    import movieSearchResultsStore from "../stores/movieSearchResultsStore.js";

    let genres = []
    let deleted, order, sortBy;
    
    const handleSearch = async (e) => {
        if (e.key === 'Enter' && (e.target.value !== '' || deleted || order ||  genres.length > 0 )) {
            let url = `http://localhost:3000/api/v1/movies?` + (e.target.value !== '' ? `keyword=${e.target.value}&` : '' ) +
             (sortBy ? `sortBy=${sortBy}&` : '' ) + (order ? `order=${order}&` : '' ) +  (genres.length > 0 ? `genres=${String(genres)}&` : '' ) +
             (deleted ? `deleted=${deleted}&` :'')
            let moviesList = await fetch(url,{
                headers: {
                    "Authorization": $authStore.roles.includes("admin") ? `Bearer ${$authStore.token}` : undefined
                }
            })
            
            moviesList = await moviesList.json()
            movieSearchResultsStore.set(moviesList)
            // goto(`/search${url.substring(35)}`)
            goto(`/search`)
        
        }
        
    }
</script>
<div class="form-holder">
    <form>
        <SearchBox {handleSearch}/>
        <div class="mb-3">
            <TagsInput inputClass='form-control' style={"background-color: #2b3035;border: 0px;color: #B4B4B8;"} 
            placeholder="Genres" on:tags={(e)=>genres=e.detail.tags}/>
            
        </div>
        <div class="dropdowns">
            {#if $authStore.roles.includes('admin')}
                <div class="dropdown-div">
                    <Dropdown type={'Deleted'} options={['true', 'false']} bind:selectedOption={deleted}/>
                    
                </div>
            {/if}
            <div class="dropdown-div">
                <Dropdown type={'Sort by'} options={['title', 'releaseYear']} bind:selectedOption={sortBy}/>
                
            </div>
            <div class="dropdown-div">
                <Dropdown type={'Order'} options={['asc', 'desc']} bind:selectedOption={order}/>
                
            </div>

        </div>
       
    </form>
    
</div>


<style>
    .mb-3 {
        display: inline-block;
        background-color: #2b3035;
        width: 25%;
        border-radius: 20px;
        margin-left: 20px;
        margin-right: 20px;
    }
    .dropdown-div{
        display: inline-block;
        background-color: #2b3035;
        border-radius: 20px;
        margin-left: 20px;
        margin-right: 20px;
        /* position: absolute; */
    }
    .form-holder {
        text-align: center;
    }
    .dropdowns {
        margin-top: 10px;
    }
</style>
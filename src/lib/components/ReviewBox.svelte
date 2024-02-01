<script>
    let rating = 0;
    let reviewText = "";
  
    function submitReview() {
      console.log("Rating:", rating);
      console.log("Review Text:", reviewText);
    }

    function handleCheck(e) {
        rating = Number(e.target.value);
        for (let i = 1; i <= rating; i++) {
            document.querySelector(`#star${i}`).checked = true
        }
        for (let i = rating+1; i <= 5; i++) {
            document.querySelector(`#star${i}`).checked = false
        }
        
    }
  </script>
  

<h4 class="review-heading"> Your review:</h4>
  
<div class="container"> 

    <form>
        <div class="mb-3">
        <label class="form-label">Rating:</label>
        <div class="stars">
            <input type="checkbox" id="star1" name="rating" value="1" on:click={handleCheck}/>
            <label for="star1"></label>
            <input type="checkbox" id="star2" name="rating" value="2" on:click={handleCheck}/>
            <label for="star2"></label>
            <input type="checkbox" id="star3" name="rating" value="3" on:click={handleCheck}/>
            <label for="star3"></label>
            <input type="checkbox" id="star4" name="rating" value="4" on:click={handleCheck}/>
            <label for="star4"></label>
            <input type="checkbox" id="star5" name="rating" value="5" on:click={handleCheck}/>
            <label for="star5"></label>
        </div>
        </div>
    
        <div class="mb-3">
        <label class="form-label">Review Text:</label>
            <textarea class="form-control" rows="3" bind:value={reviewText} data-bs-theme="dark"></textarea>
        </div>
    
        <button type="button" class="btn btn-primary" on:click={submitReview}>Post</button>
    </form>
    
</div>

<style>

    .btn.btn-primary {
        background-color: #d63837;
        border: #d63837;
    }
    .stars {
        display: inline-block;
    }

    .stars input {
        display: none;
    }

    .stars label {
        font-size: 24px;
        cursor: pointer;
        color: #D3D3D3;

    }

    .stars label:before {
        content: '\2605';
        display: block;
    }

    .stars input:checked ~ label {
        color: #ffac00;
    }

    .stars input:not(:checked) ~ label {
        color: #D3D3D3;

    }

    .container {
        width: 30%;
        padding: 20px;
        margin: 30px;
        margin-top: 5px;
        background-color: #2B3035;
        border-radius: 2%;
        color: #D3D3D3;
    }

    .review-heading {
        display: inline-block;
        margin-bottom: 3px;
        margin-left: 30px;
        color: white;
    }
</style>


    
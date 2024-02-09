<script>
    let isOpen = false;
    export let selectedOption = null;
  
    function toggleDropdown() {
      isOpen = !isOpen;
    }
  
    function selectOption(option) {
      selectedOption = option;
      isOpen = false;
    }

    export let type;
    export let options;
  </script>
  
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" on:click={toggleDropdown} aria-expanded={isOpen}>
      {#if selectedOption}
        {selectedOption}
      {:else}
        {type}
      {/if}
    </button>
    <ul class="dropdown-menu" style="display: {isOpen ? 'block' : 'none'};">
      {#each options as option}
        <li><a class="dropdown-item" href=""on:click={() => selectOption(option)}>{option}</a></li>
      {/each}
    </ul>
  </div>
  
  <style>
    /* Add your custom styles here if needed */
    .dropdown {
      position: relative;
    }
  
    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1000;
      display: none;
      float: left;
      min-width: 10rem;
      padding: 0.5rem 0;
      margin: 0.125rem 0 0;
      font-size: 1rem;
      color: #212529;
      text-align: left;
      list-style: none;
      background-color: #5c636a;
      background-clip: padding-box;
      border: 1px solid rgba(0, 0, 0, 0.125);
      border-radius: 0.25rem;
    }
  
    .dropdown-item {
      display: block;
      width: 100%;
      padding: 0.25rem 1.5rem;
      clear: both;
      font-weight: 400;
      color: #212529;
      text-align: inherit;
      white-space: nowrap;
      background-color: transparent;
      border: 0;
    }
  </style>
  
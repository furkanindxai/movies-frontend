<script>
    import { page } from '$app/stores';
    import { navigating } from '$app/stores';
    import { goto } from '$app/navigation';
    import authStore from '../../lib/stores/authStore';
    import { onMount } from 'svelte';
    import Table from "../../lib/components/Table.svelte";
    import Sidebar from "../../lib/components/Sidebar.svelte"
    let selected, fields = [], data = [];    

    onMount(async() => {
      if ($authStore.isAuth === 0 || !$authStore.roles.includes("admin")) goto("/")
      else {
          let response = await fetch(`http://localhost:3000/api/v1/users`,{
          headers: {
              "Authorization": `Bearer ${$authStore.token}`
          }
          })
          data = await response.json()
          
          if (data.length > 0) {
            fields = [...Object.keys(data[0]), "action"]
            
          }
          const newData = data.map(el=>{
              if (el.deletedAt) {
                el.action = "Restore"
              }
              else {
                el.action = "Delete"
              }
              return el
          })
          data = newData

        }

  })
</script>

<style>
    div {
      display: flex;
    }
  
    /* Style for the Sidebar */
    .sidebar {
      flex: 0 0 200px; /* Fixed width for the Sidebar */
      height: 100vh; /* Full height of the viewport */
      background-color: #2b3035;
      position: fixed; /* Fix the Sidebar position */
      top: 0;
      left: 0;
      overflow-y: auto; /* Enable scrolling for the Sidebar if needed */
    }
  
    /* Style for the Table */
    .table {
      flex: 1; /* Take up remaining space in the flex container */
      margin-left: 220px; /* Adjust margin to match Sidebar width */
    }
  </style>
  
  <div>
    <div class="sidebar">
      <Sidebar bind:selected={selected} bind:fields={fields} bind:data={data}/>
    </div>
    <div class="table">
      <Table {fields} bind:data={data} {selected}/>
    </div>
  </div>
  
<script>
	import { createEventDispatcher } from 'svelte';
    
    export let id;
    export let inputClass;
    let tags = []

    const dispatch = createEventDispatcher();
    const handleTagChange = () => {
        dispatch('tags', {
			tags
		});
	}
    
    const handleKeydown = (e) => {
        if (e.key === 'Enter')
        {
            e.preventDefault();
            const tagContent = e.target.value.trim().toLowerCase()
            if (tagContent !== '' && !tags.includes(tagContent)) {
                tags = [...tags, tagContent]
                e.target.value = ''
            }
            handleTagChange()
            
        }
   
    }

    const handleDelete = (e, tag) => {
        e.preventDefault()
        tags = tags.filter((tagFromArray) => tag !== tagFromArray)
        handleTagChange()

    }
</script>

<input type="text" class={inputClass} id={id} name={id} on:keydown={(e)=>handleKeydown(e)}>
{#if tags.length > 0}
    <div class="tags-input">
        <ul>
                {#each tags as tag (tag)}
                    <li style="color: white;">
                        {tag}
                        <button class="delete-button" on:click={(e)=>handleDelete(e,tag)}>X</button>
                    </li>
                {/each}
        
        </ul>
    </div>
{/if}



<style> 
    .tags-input { 
        display: inline-block; 
        position: relative; 
        border-radius: 4px; 
        padding: 5px; 
        box-shadow: 2px 2px 5px #00000033; 
        margin-top: 10px; 
    } 

    .tags-input ul { 
        list-style: none; 
        padding: 0; 
        margin: 0; 
    } 

    .tags-input li { 
        display: inline-block; 
        background-color: #3A4047; 
        border-radius: 20px; 
        padding: 5px 10px; 
        margin-right: 5px; 
        margin-bottom: 5px; 
    } 

    .tags-input .delete-button { 
        background-color: transparent; 
        border: none; 
        color: #999; 
        cursor: pointer; 
        margin-left: 5px; 
    } 
</style> 

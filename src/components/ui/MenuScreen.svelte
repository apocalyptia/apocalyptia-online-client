<script>
	import { fade } from 'svelte/transition'
    import { createEventDispatcher } from 'svelte';

    export let options

    const dispatch = createEventDispatcher()

    const navigate = (option) => {
        dispatch('nav', { selection: option.content })
    }
</script>

<div class='menu-page' in:fade>
    {#each options as option}
        <button
            class='display-button'
            on:click|preventDefault={(event) => navigate(option)}
        >
            {option.name}
        </button>
    {/each}
</div>
<script>
    import { createEventDispatcher } from 'svelte';
    export let step;

    const dispatch = createEventDispatcher();

    function back () { dispatch('message', { number: --step }) }

    function next() { dispatch('message', { number: ++step }) }
</script>

<div>
    <button on:click={back}>Back</button>
    <button on:click={next}>Next</button>
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        position: fixed;
        left: 0;
        bottom: 0px;
        height: 40px;
        width: 100vw;
    }
    button {
        border: 1px solid;
        width: 50vw;
    }
</style>
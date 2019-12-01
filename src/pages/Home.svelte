<script>
    import router from '../routes'
	import Creator from './Creator.svelte'
	import Reference from './Reference.svelte'
</script>

<div class='page home-page'>
    <button on:click={router.Creator}>Character Creator</button>
    <button on:click={router.Reference}>Rules Reference</button>
</div>

<style>
    .home-page {
        text-align: center;
    }
    button {
        padding: 2rem;
        width: 70%;
        margin: 1rem auto;
    }
</style>
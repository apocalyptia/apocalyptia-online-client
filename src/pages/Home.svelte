<script>
    import router from '../routes'
	import Creator from './Creator.svelte'
	import Rules from './Rules.svelte'
</script>

<div class='page home-page'>
    <button on:click={router.Creator}>Character Creator</button>
    <button on:click={router.Rules}>Rules</button>
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
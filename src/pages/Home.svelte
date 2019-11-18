<script>
    import router from '../routes.js'
	import Character from './Character.svelte'
	import Rules from './Rules.svelte'
</script>

<div class="page home-page">
    <button on:click={router.goCharacter}>Character</button>
    <button on:click={router.goRules}>Rules</button>
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
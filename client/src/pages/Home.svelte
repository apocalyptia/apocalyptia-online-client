<script>
	import { router } from '../routes'
	import Creator from './Creator.svelte'
	import Reference from './Reference.svelte'
</script>

<div class='menu-page'>
	<button on:click={router.Creator}>Character Creator</button>
	<button on:click={router.Reference}>Rules Reference</button>
</div>
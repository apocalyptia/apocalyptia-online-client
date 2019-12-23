<script>
	import { router } from '../routes'
	import Creator from './Creator.svelte'
	import Reference from './Reference.svelte'
</script>

<div class='display-page'>
	<button class='diplay-button' on:click={router.Creator}>
		Character Creator
	</button>
	<button class='diplay-button' on:click={router.Reference}>
		Rules Reference
	</button>
</div>
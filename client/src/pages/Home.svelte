<script>
	import { fade } from 'svelte/transition'
	import { router } from '../routes'
	import Creator from './Creator.svelte'
	import Reference from './Reference.svelte'
</script>

<div class='display-page' in:fade>
	<button class='diplay-button' on:click={router.Creator}>
		Character Creator
	</button>
	<button class='diplay-button' on:click={router.Reference}>
		Rules Reference
	</button>
</div>
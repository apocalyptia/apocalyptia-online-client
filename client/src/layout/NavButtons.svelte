<script>
	import { router } from '../routes'
	import { createEventDispatcher } from 'svelte'
	export let screen

	let ced = createEventDispatcher()

	function back () { ced('message', { number: --screen.step }) }

	function home () { router.Home() }

	function next() { router.Traits() }

	// ced('message', { number: ++screen.step })
</script>

<div class='nav-buttons'>
	<button class='nav-button' on:click={back}>Back</button>
	<button class='nav-button' on:click={home}>Home</button>
	<button class='nav-button' on:click={next}>Next</button>
</div>

<style>
	.nav-buttons {
		display: flex;
		flex-direction: row;
		position: fixed;
		left: 0;
		bottom: 0px;
		height: 50px;
		width: 100vw;
	}
	.nav-button {
		border: 1px solid;
		width: 50vw;
	}
</style>
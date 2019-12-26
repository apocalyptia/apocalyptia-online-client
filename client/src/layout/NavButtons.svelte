<script>
	import { router } from '../routes'
	import { createEventDispatcher } from 'svelte'
	export let screen

	let ced = createEventDispatcher()

	const back  = () => { ced('message', { number: --screen.step }) }

	const home  = () => { router.Home() }

	const next = () => { router.Traits() }

	// ced('message', { number: ++screen.step })
</script>

<div class='nav-buttons'>
	<button class='nav-button' on:click={back}>Back</button>
	<button class='nav-button' on:click={home}>Home</button>
	<button class='nav-button' on:click={next}>Next</button>
</div>

<style>
	.nav-buttons {
		bottom: 0px;
		display: flex;
		flex-direction: row;
		height: 50px;
		left: 0;
		position: fixed;
		width: 100vw;
	}
	.nav-button {
		border: 1px solid;
		width: 33.3vw;
	}
</style>
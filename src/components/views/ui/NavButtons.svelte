<script>
	import * as sapper from '@sapper/app'
	import { createEventDispatcher } from 'svelte'

	export let options
	export let root = '/'

	const dispatch = createEventDispatcher()

	let step = 0

	const back = () => {
		--step
		navigate()
	}

	const home = () => {
		sapper.goto(root)
	}

	const next = () => { 
		++step
		navigate()
	}

	const navigate = () => {
		if (step > options.length -1 || step < 0) sapper.goto(root)
		else dispatch('nav', { selection: options[step].content })
	}
</script>


<div class='nav-buttons'>
	<button class='nav-button' on:click={back}>&lt;</button>
	<button class='nav-button' on:click={home}>Home</button>
	<button class='nav-button' on:click={next}>&gt;</button>
</div>


<style>
	.nav-buttons {
		bottom: 0;
		display: flex;
		left: 0;
		position: fixed;
		width: 100%;
	}
	.nav-button {
		border: 1px solid var(--txt-color);
		flex: 1;
		font-size: 1.25rem;
		height: 3rem;
	}
</style>
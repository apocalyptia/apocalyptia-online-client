<script>
	import { createEventDispatcher } from 'svelte'

	export let options

	const dispatch = createEventDispatcher()

	let step = 0

	const back = () => {
		--step
		navigate()
	}

	const home = () => {
		// router.Home()
	}

	const next = () => { 
		++step
		navigate()
	}

	const navigate = () => {
		if (step > options.length -1 || step < 0) goto("/")
		else dispatch('nav', { selection: options[step].content })
	}
</script>

<div class='nav-buttons'>
	<button class='nav-button' on:click={back}>Back</button>
	<a href="/">
		<button class='nav-button'>Home</button>
	</a>
	<button class='nav-button' on:click={next}>Next</button>
</div>

<style>
	.nav-buttons {
		bottom: 0;
		display: flex;
		left: 0;
		position: fixed;
		width: 100vw;
	}
	.nav-button {
		border: 1px solid var(--txt-color);
		flex: 1;
		font-size: 1.25rem;
		height: 3rem;
	}
</style>
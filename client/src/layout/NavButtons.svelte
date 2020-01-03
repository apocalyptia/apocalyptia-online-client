<script>
	import { router } from '../routes'
	import { createEventDispatcher } from 'svelte';

	export let options;
	export let selected;

	const dispatch = createEventDispatcher()

	let screen = {
		step: 0,
		optionList: options
	}
	selected = screen.optionList[screen.step]

	const back = () => {
		--screen.step
		navigate()
	}

	const menu = () => {
		screen.step = 0
		navigate()
	}

	const next = () => { 
		++screen.step
		navigate()
	}

	const navigate = () => {
		if (screen.step == screen.optionList.length || screen.step < 0) { router.Home() }
		else {
			selected = screen.optionList[screen.step]
			dispatch('nav', {
				selection: selected
			})
		}
	}
</script>

<div class='nav-buttons'>
	<button class='nav-button' on:click={back}>Back</button>
	<button class='nav-button' on:click={menu}>Menu</button>
	<button class='nav-button' on:click={next}>Next</button>
</div>

<style>
	.nav-buttons {
		bottom: 0;
		display: flex;
		height: 3rem;
		left: 0;
		position: fixed;
		width: 100vw;
	}
	.nav-button {
		border: 1px solid var(--txt-color);
		font-size: 1.25rem;
		height: inherit;
		width: 50vw;
	}
</style>
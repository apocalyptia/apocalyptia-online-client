<script>
	import { character } from 'stores/characterStore.js'
	import { beforeUpdate, createEventDispatcher, onMount } from 'svelte'
	import Traits from 'lists/Traits.js'
	import Skills from 'lists/skills/Skills.js'

	const dispatch = createEventDispatcher()

	let proceed

	$: current = $character.meta.status.step

	$: nextButton = 'X'

	const back = _ => {
		$character.meta.status.step -= 1
		$character = $character
		dispatch('message', { step: $character.meta.status.step })
	}

	const home = _ => {
		window.location.assign('www.apocalyptiaonline.com')
	}

	const next = _ => {
		proceedStatus()
		if (proceed) {
			$character.meta.status.step += 1
			$character = $character
			dispatch('message', { step: $character.meta.status.step })
		}
	}

	const proceedStatus = _ => {
		proceed = true
		if (
			(current == 1 && Object.values($character.desc).some(d => d.value == ``)) ||
			(current == 2 && Traits.remaining($character) > 0) ||
			(current == 3 && Skills.remaining($character) > 0) ||
			(current == 6 && Object.values($character.gear).some(g => g.inventory.length == 0))
		) proceed = false
		if (proceed) nextButton = '&rtrif;'
		else nextButton = '&#10006;'
	}

	beforeUpdate(_ => proceedStatus())
	onMount(_ => proceedStatus())
</script>


<div class='nav-bar'>
	<button on:click={back} class='link-btn nav-button'>&ltrif;</button>
	<button on:click={home} class='link-btn nav-button home-button'>Home</button>
	<button on:click={next} class='link-btn nav-button'>{@html nextButton}</button>
</div>


<style>
	.nav-bar {
		bottom: 0;
		display: flex;
		height: var(--s300);
		left: 0;
		position: fixed;
		width: 100%;
		z-index: 2;
	}
	.nav-button {
		flex: 1;
	}
	.home-button {
		font-size: var(--s125);
	}
</style>
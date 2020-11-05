<script>
	import Skills from 'rules/Skills.js'
	import Traits from 'rules/Traits.js'
	import { beforeUpdate, onMount } from 'svelte'
	import { goto } from '@sapper/app'
	import { character } from 'stores/characterStore.js'

	$: current = $character.meta.status.step

	let proceed

	const backButton = '&ltrif;'

	$: nextButton = '&#10006;'

	const back = _ => {
		$character.meta.status.step--
		if ($character.meta.status.step < 0) goto('/')
	}

	const next = _ => {
		proceedStatus()
		if (proceed) $character.meta.status.step++
	}

	const proceedStatus = _ => {
		proceed = true
		if (
			(current == 0 && Object.values($character.description).some(d => d.value == ``)) ||
			(current == 1 && Traits.remaining($character) > 0) ||
			(current == 2 && Skills.remaining($character) > 0) ||
			(current == 5 && Object.values($character.gear).some(g => g.inventory.length == 0))
		) proceed = false
		if (proceed) nextButton = '&rtrif;'
		else nextButton = '&#10006;'
	}

    beforeUpdate(_ => proceedStatus())

    onMount(_ => proceedStatus())
</script>


<div class='nav-bar'>
	<button on:click={back} class='link-btn nav-button'>{@html backButton}</button>
	<button on:click={_ => goto('/')} class='link-btn nav-button home-button'>Home</button>
	<button on:click={next} class='link-btn nav-button {nextButton == '&#10006;' ? 'crimson-btn' : '' }'>{@html nextButton}</button>
</div>


<style>
    .nav-bar {
		bottom: 0;
		display: flex;
		height: var(--s300);
		left: 0;
		position: fixed;
		width: 100%;
		z-index: 6;
	}
	.nav-button {
		flex: 1;
	}
	.home-button {
		font-size: var(--s125);
	}
</style>
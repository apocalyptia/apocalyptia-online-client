<script>
	import GoTo from 'utils/GoTo.js'
	import Skills from 'rules/Skills.js'
	import Traits from 'rules/Traits.js'
	import { beforeUpdate, onMount } from 'svelte'
	import { character } from 'stores/characterStore.js'

	$: current = $character.meta.step

	let proceed

	const backButton = '&lt;'

	$: nextButton = 'X'

	const back = _ => {
		$character.meta.step--
		if ($character.meta.step < 0) GoTo('/character/new')
		window.scrollTo(0,0)
	}

	const next = _ => {
		proceedStatus()
		if (proceed) $character.meta.step++
		window.scrollTo(0,0)
	}

	const proceedStatus = _ => {
		proceed = true
		if (
			(current == 0 && Object.values($character.description).some(d => d.value == ``)) ||
			(current == 1 && Traits.remaining($character) != 0) ||
			(current == 2 && Skills.remaining($character) != 0) ||
			(current == 5 && Object.values($character.gear).some(g => g.inventory.length == 0))
		) proceed = false
		if (proceed) nextButton = '&gt;'
		else nextButton = 'X'
	}

    beforeUpdate(_ => proceedStatus())

    onMount(_ => proceedStatus())
</script>


<div class='nav-bar'>
	<button on:click={back} class='link-btn'>{@html backButton}</button>
	<button on:click={_ => GoTo('/')} class='link-btn'>Home</button>
	<button on:click={next} class='{proceed ? 'link-btn' : 'crimson-btn' }'>{@html nextButton}</button>
</div>


<style>
    .nav-bar {
		bottom: 0;
		display: flex;
		left: 0;
		position: fixed;
		width: 100%;
		z-index: 6;
	}
	.crimson-btn,
	.link-btn {
		flex: 1;
		font-size: var(--s125);
	}
</style>
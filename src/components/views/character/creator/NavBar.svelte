<script>
	import GoTo from 'utils/GoTo.js'
	import Skills from 'rules/Skills.js'
	import Traits from 'rules/Traits.js'
	import { beforeUpdate } from 'svelte'
	import { character } from 'stores/characterStore.js'

	$: current = $character.meta.step

	let proceed

	const backButton = '&lt;'

	$: nextButton = 'x'

	const back = _ => {
		document.getElementById('character-creator').scrollTo(0, 0)
		$character.meta.step--
		if ($character.meta.step < 0) GoTo('/character/new')
	}

	const next = _ => {
		proceedStatus()
		document.getElementById('character-creator').scrollTo(0, 0)
		if (proceed) $character.meta.step++
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
		else nextButton = 'x'
	}

	beforeUpdate(_ => proceedStatus())
</script>


<div class='nav-bar'>
	<button on:click={back}>
		{@html backButton}
	</button>
	<button on:click={_ => GoTo('/')}>
		Home
	</button>
	<button on:click={next}
		class='{proceed ? '' : 'crimson-btn' }'
	>
		{@html nextButton}
	</button>
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
	button {
		flex: 1;
	}
	.crimson-btn {
		font-size: var(--s150);
	}
</style>
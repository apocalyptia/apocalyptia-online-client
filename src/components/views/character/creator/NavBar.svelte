<script>
	import GoTo from 'utils/GoTo.js'
	import { characterStore } from 'stores/characterStore.js'
	import { beforeUpdate } from 'svelte'

	export let proceedConditions

	export let limit

	let backButton = '&lt;'

	let nextButton = '&gt'

	let canProceed = true

	const back = _ => {
		document.getElementById('character-creator').scrollTo(0, 0)
		$characterStore.meta.step--
		if ($characterStore.meta.step < 0) GoTo('/character/new')
	}

	const next = _ => {
		proceedStatus()
		document.getElementById('character-creator').scrollTo(0, 0)
		if (canProceed) $characterStore.meta.step++
		if ($characterStore.meta.step > limit) GoTo('/')
	}

	$: proceedStatus = _ => {
		canProceed = true
		if (proceedConditions()) canProceed = false
		if (canProceed) nextButton = '&gt;'
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
	<button on:click={next} class='{canProceed ? '' : 'crimson-btn' }'>
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
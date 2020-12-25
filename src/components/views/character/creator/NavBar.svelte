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


<button on:click={back} class='back-btn'>
	{@html backButton}
</button>
<button on:click={_ => GoTo('/')} class='home-btn'>
	Home
</button>
<button on:click={next} class='next-btn {canProceed ? '' : 'crimson-btn' }'>
	{@html nextButton}
</button>


<style>
	button {
		align-items: center;
		border-radius: var(--radius);
		border: var(--std-border) solid;
		bottom: 0;
		display: flex;
		font-size: var(--s150);
		font-weight: bold;
		height: var(--square);
		justify-content: center;
		max-height: var(--square);
		min-height: var(--square);
		position: fixed;
		text-align: center;
		z-index: 6;
	}
	.back-btn,
	.next-btn {
		max-width: var(--square);
		min-width: var(--square);
		width: var(--square);
	}
	.back-btn {
		left: 0;
	}
	.home-btn {
		left: 50vw;
		max-width: calc(var(--square) * 2);
		min-width: calc(var(--square) * 2);
		transform: translateX(-50%);
		width: calc(var(--square) * 2);
	}
	.next-btn {
		right: 0;
	}
	.crimson-btn {
		font-size: var(--s150);
	}
</style>
<script>
	import { characterStore } from 'stores/characterStore.js'
	import { beforeUpdate } from 'svelte'

	export let proceedConditions

	export let limit

	let backButton = `&lt;`

	let nextButton = `&gt;`

	let canProceed = true

	const back = _ => {
		document.getElementById('character-creator').scrollTo(0, 0)
		$characterStore.meta.step--
		if ($characterStore.meta.step < 0) {
			window.location.href = '/character/new'
		}
	}

	const next = _ => {
		proceedStatus()
		document.getElementById('character-creator').scrollTo(0, 0)
		if (canProceed) $characterStore.meta.step++
		if ($characterStore.meta.step > limit) {
			window.location.href = '/'
		}
	}

	$: proceedStatus = _ => {
		canProceed = true
		if (proceedConditions()) canProceed = false
		if (canProceed) nextButton = `&gt;`
		else nextButton = `X`
	}

	beforeUpdate(_ => proceedStatus())
</script>


<div class='nav-bar'>
	<button on:click={back} class='back-btn btn-box square-btn'>
		<div class='btn-icon'>{@html backButton}</div>
	</button>
	<button class='home-btn'>
		<a href='/'>Home</a>
	</button>
	<button on:click={next} class='next-btn btn-box square-btn {canProceed ? '' : 'crimson-btn' }'>
		<div class='btn-icon'>{@html nextButton}</div>
	</button>
</div>


<style>
	.nav-bar {
		display: flex;
		justify-content: space-between;
		z-index: 6;
	}
	.home-btn {
		font-size: var(--s150);
		height: var(--square);
		left: 50vw;
		max-width: calc(var(--square) * 2);
		min-width: calc(var(--square) * 2);
		width: calc(var(--square) * 2);
	}
</style>
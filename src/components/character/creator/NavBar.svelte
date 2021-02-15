<script>
	import characterStore from 'stores/characterStore.js'
	import { beforeUpdate } from 'svelte'
import { add_classes } from 'svelte/internal'

	export let proceedConditions, limit

	let backButton = `&lt;`

	let nextButton = `&gt;`

	let canProceed = false

	const home = _ => {
		window.location.href = '/'
	}

	const back = _ => {
		document.getElementById('character-creator').scrollTo(0, 0)
		$characterStore.meta.step--
		if ($characterStore.meta.step < 0) {
			window.location.href = '/new'
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
	<button on:click={back} class='back-btn btn-box'>
		<div class='btn-icon'>{@html backButton}</div>
	</button>
	<button on:click={home} class='home-btn btn-box'>
		<div class='btn-icon'></div>
	</button>
	<button on:click={next} class='next-btn btn-box {canProceed ? '' : 'crimson-btn' }'>
		<div class='btn-icon'>{@html nextButton}</div>
	</button>
</div>


<style>
	.nav-bar {
		display: flex;
		width: 100vw;
		position: absolute;
		bottom: 0;
		z-index: 6;
	}
	.nav-bar button {
		height: var(--square);
		width: 33.3%;
	}
	.home-btn {
		background-image: url('/icons/light-line-home-door.png');
		background-position: 50%;
		background-repeat: no-repeat;
		height: 100%;
		width: 100%;
	}
	.home-btn:hover {
		background-image: url('/icons/dark-line-home-door.png');
	}
</style>
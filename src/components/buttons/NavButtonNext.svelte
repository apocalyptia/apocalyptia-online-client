<script>
	import characterStore from 'stores/characterStore.js'

	export let limit, canProceed

	const next = _ => {
		proceedStatus()
		document.getElementById('character-creator').scrollTo(0, 0)
		if (canProceed) $characterStore.meta.step++
		if ($characterStore.meta.step > limit) {
			window.location.href = '/'
		}
	}

	$: nextButton = _ => {
		if (canProceed) return `&gt;`
		else return `X`
	}
</script>


<button on:click={next} class='next-btn btn-box {canProceed ? '' : 'crimson-btn' }'>
	<div class='btn-icon'>{nextButton()}</div>
</button>


<style>
	button {
		height: var(--square);
		width: 100%;
	}
</style>
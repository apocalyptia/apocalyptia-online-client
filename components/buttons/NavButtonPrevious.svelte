<script>
	import characterStore from '/src/stores/characterStore.js'

	const previous = () => {
		document.getElementById('character-creator').scrollTo(0, 0)
		$characterStore.step--
		if ($characterStore.step < 0) {
			$characterStore.step = 0
			window.location.href = '/new'
		}
	}

	let previousButton = `&lt;`
</script>


<button on:click={previous} class='previous-btn btn-box'>
	<div class='btn-icon'>{@html previousButton}</div>
</button>


<style>
	button {
		height: var(--square);
		width: 100%;
	}
</style>
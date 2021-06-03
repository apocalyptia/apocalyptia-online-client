<script>
	import creationStore from '/src/stores/creationStore.js'
	import { goto } from '$app/navigation'

	function previous() {
		document.getElementById('character-creator').scrollTo(0, 0)
		$creationStore.step--
		if ($creationStore.checkMin()) {
			goto(`/character/new`)
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

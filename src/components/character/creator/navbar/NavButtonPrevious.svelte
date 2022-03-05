<script>
	import characterStore from '$stores/characterStore.js'
	import { goto } from '$app/navigation'

	function previous() {
		document.getElementById('character-creator').scrollTo(0, 0)
		$characterStore.meta.step = $characterStore.meta.step - 1
		if ($characterStore.creationCheckMinSteps()) {
			goto(`/character/new`)
		}
	}

</script>

<button on:click={previous} class="previous-btn btn-box">
	<div class="btn-icon">{@html `&lt;`}</div>
</button>

<style>
	button {
		height: var(--square);
		width: 100%;
	}
</style>

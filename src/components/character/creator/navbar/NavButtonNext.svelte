<script>
	import characterStore from '$stores/characterStore.js'
	import playerStore from '$stores/playerStore.js'
	import { goto } from '$app/navigation'

	function next() {
		document.getElementById('character-creator').scrollTo(0, 0)
		if ($characterStore.meta.proceed) {
			$characterStore.meta.step = $characterStore.meta.step + 1
			if ($characterStore.creationCheckMaxSteps()) {
				$characterStore = $characterStore.finalizeCharacter()
				$playerStore = $playerStore.saveCharacter($characterStore)
				goto(`/character/sheet`)
			}
		}
	}
</script>


<button on:click={next} class="next-btn btn-box" disabled={$characterStore.meta.proceed === false}>
	<div class="btn-icon">
		{@html $characterStore.meta.proceed ? `&gt;` : `X`}
	</div>
</button>


<style>
	button {
		height: var(--square);
		width: 100%;
	}
</style>

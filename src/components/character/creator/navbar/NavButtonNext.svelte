<script>
	import characterStore from '/src/stores/characterStore.js'
	import creationStore from '/src/stores/creationStore.js'
	import playerStore from '/src/stores/playerStore.js'
	import { beforeUpdate } from 'svelte'
	import { goto } from '$app/navigation'

	function next() {
		document.getElementById('character-creator').scrollTo(0, 0)
		if ($creationStore.proceed) {
			$creationStore.step++
			$creationStore = $creationStore
			if ($creationStore.checkMax()) {
				$playerStore.saveCharacter($characterStore)
				goto(`/character/sheet`)
			}
		}
	}

	beforeUpdate(() => {
		$creationStore.canProceed($characterStore)
		$creationStore = $creationStore
	})
</script>


<button on:click={next} class="next-btn btn-box" disabled={$creationStore.proceed === false}>
	<div class="btn-icon">
		{@html $creationStore.proceed ? `&gt;` : `x`}
	</div>
</button>


<style>
	button {
		height: var(--square);
		width: 100%;
	}
</style>

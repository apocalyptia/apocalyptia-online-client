<script>
	import characterStore from '/src/stores/characterStore.js'
	import creationStore from '/src/stores/creationStore.js'
	import playerStore from '/src/stores/playerStore.js'
	import { beforeUpdate } from 'svelte'
	import { goto } from '$app/navigation'

	beforeUpdate(() => {
		$characterStore.proceed = $characterStore.canProceed($creationStore.step)
	})

	function next() {
		document.getElementById('character-creator').scrollTo(0, 0)
		if ($characterStore.proceed) {
			$creationStore.step++
			if ($creationStore.checkMax()) {
				$playerStore.saveCharacter($characterStore)
				goto(`/`)
			}
		}
	}
</script>

<button on:click={next} class="next-btn btn-box" disabled={$characterStore.proceed === false}>
	<div class="btn-icon">
		{@html $characterStore.proceed ? `&gt;` : `X`}
	</div>
</button>

<style>
	button {
		height: var(--square);
		width: 100%;
	}
</style>

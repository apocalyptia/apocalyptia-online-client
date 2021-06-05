<script>
	import characterStore from '/src/stores/characterStore.js'
	import playerStore from '/src/stores/playerStore.js'
	import { goto } from '$app/navigation'

	function loadCharacter() {
		$characterStore = $playerStore.loadCharacter($playerStore.selectedCharacter)
		console.log($characterStore.description.name.value)
		goto('/character/sheet')
	}

	function newCharacter() {
		goto('/character/new')
	}

	function backupCharacter() {
		console.log($playerStore.selectedCharacter)
		$playerStore.backupCharacter()
	}

	function deleteCharacter() {
		$playerStore.deleteCharacter($playerStore.selectedCharacter)
	}
</script>

<div class='controls'>
	<button class='small-cntr-btn' on:click={newCharacter}> New </button>
		<button class='small-cntr-btn' disabled={$playerStore.selectedCharacter === null} on:click={loadCharacter}> Load </button>
		<button class='small-cntr-btn' disabled={$playerStore.selectedCharacter === null} on:click={backupCharacter}> Backup </button>
</div>

<style>
	.controls {
		display: flex;
		justify-content: space-between;
		padding-top: var(--std-padding);
		width: 100%;
	}
	button {
		height: var(--square);
		max-width: calc(var(--square) * 5);
	}
</style>

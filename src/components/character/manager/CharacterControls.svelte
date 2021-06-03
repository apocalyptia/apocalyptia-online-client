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
	<div class='top-row'>
		<button class='small-cntr-btn' disabled={$playerStore.selectedCharacter === null} on:click={loadCharacter}> Load </button>
		<button class='small-cntr-btn' disabled={$playerStore.selectedCharacter === null} on:click={backupCharacter}> Backup </button>
	</div>
	<div class='bottom-row'>
		<button class='small-cntr-btn' on:click={newCharacter}> New </button>
		<button class='small-cntr-btn' disabled={$playerStore.selectedCharacter === null} on:click={deleteCharacter}> Delete </button>
	</div>
</div>

<style>
	.controls {
		padding-top: var(--std-padding);
		width: 100%;
	}
	div[class*='-row'] {
		display: flex;
		justify-content: space-around;
		width: 100%;
	}
	.bottom-row {
		margin-top: var(--std-margin);
	}
	button {
		height: var(--square);
		max-width: calc(var(--square) * 5);
		width: 25vw;
	}
</style>

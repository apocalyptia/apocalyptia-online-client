<script>
	import BackupCharacter from '$database/characters/BackupCharacter.js'
	import characterStore from '$stores/characterStore.js'
	import playerStore from '$stores/playerStore.js'

	const deleteCharacter = _ => {
		$playerStore = $playerStore.deleteCharacter(selectedCharacter)
		$playerStore.characterList = $playerStore.characterList.filter(c => c.description.name.value != selectedCharacter)
		$characterStore = $playerStore.characterList[$playerStore.currentCharacter]
	}

	const loadCharacter = _ => {
		$playerStore = $playerStore.loadCharacter(selectedCharacter)
		$characterStore = $playerStore.characterList[$playerStore.currentCharacter]
		window.location.href = 'character/sheet'
	}

	const backupCharacter = _ => BackupCharacter($characterStore)

	const newCharacter = _ => window.location.href = 'character/new'
</script>


<div class='controls'>
	<button class='small-cntr-btn' on:click={loadCharacter}>Load</button>
	<button
		class='small-cntr-btn'
		on:click={backupCharacter}>Backup</button>
	<button class='small-cntr-btn' on:click={newCharacter}>New</button>
	<button
		class='small-cntr-btn'
		on:click={deleteCharacter}>Delete</button>
</div>


<style>
	.controls {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-top: var(--std-padding);
		width: 100%;
	}
	.small-cntr-btn {
		width: 50%;
		min-width: 50%;
	}
</style>
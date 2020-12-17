<script>
	import AdjustUIColor from 'utils/AdjustUIColor.js'
	import BackButton from 'icons/BackButton.svelte'
	import BackupCharacter from 'database/BackupCharacter.js'
	import GoTo from 'utils/GoTo.js'
	import ResetUIColor from 'utils/ResetUIColor.js'
	import TrashButton from 'icons/TrashButton.svelte'
	import { beforeUpdate } from 'svelte'
	import { character } from 'stores/characterStore.js'
	import { player } from 'stores/playerStore.js'

	let selectedCharacter = ''

	const loadCharacter = (_) => {
		$character = LoadCharacter(selectedCharacter)
		$player = $player.loadCharacter($character)
		AdjustUIColor($character)
		GoTo('character/sheet')
	}

	const backupCharacter = (_) => BackupCharacter($character)

	const deleteCharacter = (_) => {
		$player = $player.deleteCharacter(selectedCharacter)
		$player.characterList = $player.characterList.filter(c => c.description.name.value != selectedCharacter)
		$character = $player.characterList[$player.currentCharacter]
		if ($player.characterList.length) AdjustUIColor($character)
		else ResetUIColor()
		GoTo('character/load')
	}

	const newCharacter = (_) => GoTo('character/new')

	const selectCharacter = (event) => selectedCharacter = event.target.textContent

	beforeUpdate(_ => $player = $player.loadAllCharacters())
</script>


<svelte:head>
	<title>Apocalyptia Online - Load Character</title>
</svelte:head>
<div class='cntr-card'>
	<div class='character-storage-list-window'>
		{#if $player.characterList.length}
			<div class='character-storage-list'>
				{#each $player.characterList as c}
					<div class='stored-character'>
						<button
							class='character-name'
							on:click={(event) => selectCharacter(event)}>
							{c.description.name.value}
						</button>
						<TrashButton
							args={c.description.name.value}
							on:click={deleteCharacter} />
					</div>
				{/each}
			</div>
		{/if}
	</div>
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
</div>
<BackButton path={'character'} />


<style>
	.character-storage-list-window {
		border: 2px solid var(--pri-color);
		height: 50vh;
		overflow-y: scroll;
		width: 100%;
	}
	.stored-character {
		display: flex;
		height: var(--square);
		justify-content: space-between;
		width: 100%;
	}
	.character-name {
		align-items: center;
		border-bottom: 1px solid var(--pri-color);
		display: flex;
		height: var(--square);
		padding-left: var(--s100);
		text-align: left;
		width: 100%;
	}
	.character-name:hover {
		background-color: var(--pri-color-trans);
		color: var(--sec-color);
	}
	.stored-character:focus {
		background-color: var(--pri-color-trans);
		color: var(--sec-color);
	}
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
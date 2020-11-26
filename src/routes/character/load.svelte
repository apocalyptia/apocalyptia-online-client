<script>
	import BackButton from 'icons/BackButton.svelte'
	import BackupCharacter from 'database/BackupCharacter.js'
	import DeleteCharacter from 'database/DeleteCharacter.js'
	import GoTo from 'utils/GoTo.js'
	import LoadAllCharacters from 'database/LoadAllCharacters.js'
	import LoadCharacter from 'database/LoadCharacter.js'
	import TrashButton from 'icons/TrashButton.svelte'
	import { character } from 'stores/characterStore.js'
	import { characterList } from 'stores/characterListStore.js'
	import { beforeUpdate } from 'svelte'

	let selectedCharacter = ''

	const loadCharacter = _ => {
		$character = LoadCharacter(selectedCharacter)
		GoTo('character/sheet')
	}

	const backupCharacter = _ => BackupCharacter($character)

	const deleteCharacter = _ => {
		DeleteCharacter(selectedCharacter)
		GoTo('character/load')
	}

	const newCharacter = _ => GoTo('character/new')

	const selectCharacter = (event) => selectedCharacter = event.target.textContent

	beforeUpdate(_ => $characterList = LoadAllCharacters())
</script>


<svelte:head>
	<title>Apocalyptia Online - Load Character</title>
</svelte:head>
<div class='cntr-card'>
	<div class='character-storage-list-window'>
		{#if $characterList.length}
			<div class='character-storage-list'>
				{#each $characterList as c}
					<div class='stored-character'>
						<div class='character-name' on:click={event => selectCharacter(event)}>
							{c.description.name.value}
						</div>
						<TrashButton args={c.description.name.value} deleteFunction={deleteCharacter} />
					</div>
				{/each}
			</div>
		{/if}
	</div>
	<div class='controls'>
		<button class='small-cntr-btn' on:click={loadCharacter}>Load</button>
		<button class='small-cntr-btn' on:click={backupCharacter}>Backup</button>
		<button class='small-cntr-btn' on:click={newCharacter}>New</button>
		<button class='small-cntr-btn' on:click={deleteCharacter}>Delete</button>
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
		padding-left: var(--s100);
		text-align: left;
		width: 100%;
	}
	.character-name:hover {
		background-color: var(--pri-color);
		color: var(--sec-color);
	}
	.stored-character:focus {
		background-color: var(--pri-color);
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
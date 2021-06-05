<script>
	import characterStore from '/src/stores/characterStore.js'
	import playerStore from '/src/stores/playerStore.js'
	import { onMount } from 'svelte'

	let characterList = []

	function selectCharacter(character) {
		$playerStore.selectedCharacter = character.meta.id
		$characterStore = character
	}

	function deleteCharacter(character) {
		$playerStore.deleteCharacter(character)
		$playerStore = $playerStore
	}

	onMount(() => {
		characterList = $playerStore.readCharacters()
		console.log('character list on mount = ', characterList)
	})
</script>

<div class='character-storage-list-window'>
	<div class='current-character'>
		Current Character: {$characterStore?.description?.name?.value || 'none'}
	</div>
	{#if characterList.length}
		<div class='character-storage-list'>
			{#each characterList as character, i (character.meta.id)}
				<div class='stored-character'>
					<button class='character-name' on:click={() => selectCharacter(character)}>
						{i}: {character.description.name.value}
					</button>
					<button class='btn-box trash-btn crimson-btn square-btn' on:click={() => deleteCharacter(character)}>
						<div class='btn-icon'>X</div>
					</button>					
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.character-storage-list-window {
		border: 2px solid var(--pri-color);
		height: 50vh;
		overflow-y: scroll;
		width: 100%;
	}
	.current-character {
		align-items: center;
		display: flex;
		height: var(--square);
		padding: var(--std-padding);
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
</style>

<script>
	import TrashButton from 'components/buttons/TrashButton.svelte'
	import { characterStore } from 'stores/characterStore.js'
	import { playerStore } from 'stores/playerStore.js'

	const deleteCharacter = _ => {
		$playerStore = $playerStore.deleteCharacter(selectedCharacter)
		$playerStore.characterList = $playerStore.characterList.filter(c => c.description.name.value != selectedCharacter)
		$characterStore = $playerStore.characterList[$playerStore.currentCharacter]
	}

	const selectCharacter = e => selectedCharacter = e.target.textContent

	$playerStore.characterList.forEach(c => console.log(c))
</script>


<div class='character-storage-list-window'>
	{#if $playerStore.characterList}
		<div class='character-storage-list'>
			{#each $playerStore.characterList as c}
				<div class='stored-character'>
					<button
						class='character-name'
						on:click={(event) => selectCharacter(event)}>
						{c.description.name.value}
					</button>
					<TrashButton on:click={deleteCharacter} />
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
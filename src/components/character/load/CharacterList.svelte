<script>
	import TrashButton from '/src/components/buttons/TrashButton.svelte'
	import playerStore from '/src/stores/playerStore.js'

	export let selectedCharacter

	function selectCharacter(event) {
		selectedCharacter = event.target.textContent
	}

	$: characterList = $playerStore.characterList.map(c => {
		return JSON.parse(c)
	})
</script>


<div class='character-storage-list-window'>
	{#if characterList.length}
		<div class='character-storage-list'>
			{#each characterList as c, i}
				<div class='stored-character'>
					<button class='character-name'
						on:click={(event) => selectCharacter(event)}>
						{i}: {JSON.parse(c).description.name.value}
					</button>
					<TrashButton on:click={() => $playerStore.deleteCharacter(selectedCharacter)} />
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
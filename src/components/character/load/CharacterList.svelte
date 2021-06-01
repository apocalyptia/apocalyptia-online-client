<script>
	import TrashButton from '/src/components/buttons/TrashButton.svelte'
	import playerStore from '/src/stores/playerStore.js'
	import { onMount } from 'svelte'

	export let selectedCharacter

	function selectCharacter(event) {
		selectedCharacter = event.target.textContent
	}

	onMount(() => {
		$playerStore.readCharacters()
		$playerStore = $playerStore
	})
</script>

<div class="character-storage-list-window">
	{#if $playerStore.characterList.length}
		<div class="character-storage-list">
			{#each $playerStore.characterList as c, i}
				<div class="stored-character">
					<button class="character-name" on:click={(event) => selectCharacter(event)}>
						{i}: {c.description.name.value}
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

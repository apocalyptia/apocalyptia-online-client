<script>
	import CharacterRow from '/src/components/character/manager/CharacterRow.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import playerStore from '/src/stores/playerStore.js'
	import { onMount } from 'svelte'

	onMount(() => $playerStore.readCharacter())
</script>


<div class="character-storage-list-window">
	<div class="current-character">
		Current: {$characterStore.description.name.value || 'none'}
	</div>
	{#if $playerStore.list.length}
		<div class="character-storage-list">
			{#each $playerStore.list as character, index (character.meta.id)}
				<CharacterRow {character} {index} />
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
		font-weight: bold;
		height: var(--square);
		overflow-x: hidden;
		padding-left: var(--padding);
		border-bottom: var(--std-border-width) solid var(--pri-color);
	}
</style>

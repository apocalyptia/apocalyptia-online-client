<script>
	import Character from '../../components/rules/Character'
	import CharacterSheet from '../../components/views/ui/CharacterSheet.svelte'
	import DeleteCharacter from '../../components/helpers/database/DeleteCharacter'
	import NavBar from '../../components/views/controls/NavBar.svelte'
	import SaveCharacter from '../../components/helpers/database/SaveCharacter'
	import { authUserStore } from '../../stores/netlifyStore'
	import { character } from '../../stores/characterStore'

	const saveCharacter = () => {
		$character = SaveCharacter($character, $authUserStore.id)
	}

	const deleteCharacter = () => {
		$character = DeleteCharacter($character)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online Character Creator - Character Sheet</title>
</svelte:head>
<CharacterSheet {character} readonly={true} />
<div class='sheet-buttons'>
	{#if $character.completed}
		<h2>{$character.desc.identity.value} saved successfully!</h2>
	{:else}
		<button on:click={deleteCharacter}>
			Delete
		</button>
		<button on:click={saveCharacter}>
			Save
		</button>
	{/if}
</div>
<NavBar links={{back: '/creator/gear', next: '/'}}/>


<style>
	.sheet-buttons {
		display: flex;
		justify-content: space-between;
		margin-top: var(--s100);
	}
	.sheet-buttons button {
		font-size: var(--s125);
		font-weight: bold;
		width: calc(100% / 3);
	}
</style>
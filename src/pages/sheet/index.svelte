<script>
	import { goto } from '@roxi/routify'
	import Character from '../../components/rules/Character'
	import CharacterSheet from '../../components/views/ui/CharacterSheet.svelte'
	import NavBar from '../../components/views/controls/NavBar.svelte'
	import { authUserStore } from '../../stores/netlifyStore'
	import { character } from '../../stores/characterStore'
	import SaveCharacter from '../../components/helpers/database/SaveCharacter.js'
	import DeleteCharacter from '../../components/helpers/database/DeleteCharacter.js'

	const saveCharacter = () => {
		$character = SaveCharacter($authUserStore.id, $character)
		$goto('/')
	}

	const deleteCharacter = () => {
		$character = DeleteCharacter($authUserStore.id, $character)
		$goto('/')
	}
</script>


<svelte:head>
	<title>Apocalyptia Online Character Sheet</title>
</svelte:head>
<CharacterSheet {character} writable={true} />
<div class='sheet-buttons'>
	<button on:click={deleteCharacter}>
		Delete
	</button>
	<button on:click={saveCharacter}>
		Save
	</button>
</div>
<NavBar links={{back: '/', next: '/'}}/>


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
<script>
import Character from '../../components/rules/Character'
import CharacterSheet from '../../components/views/ui/CharacterSheet.svelte'
import NavBar from '../../components/views/controls/NavBar.svelte'
import api from '../../../utils/api'
import { authUserStore } from '../../stores/netlifyStore'
import { character } from '../../stores/characterStore'


const saveCharacter = () => {
	console.log('SAVING...')
	$character.user = $authUserStore.id
	$character.completed = true
	$character.step = `complete`
	const jsonChar = JSON.stringify($character)

	window.localStorage.setItem('character', jsonChar)
	window.location.href = '/'

	api.create(jsonChar)
	console.log('SAVE COMPLETE')
}

const deleteCharacter = () => {
	$character = new Character()
	window.localStorage.removeItem('character')
	window.location.href = '/'
}
</script>


<svelte:head>
	<title>Apocalyptia Online Character Creator - Character Sheet</title>
</svelte:head>
<CharacterSheet {character} />
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
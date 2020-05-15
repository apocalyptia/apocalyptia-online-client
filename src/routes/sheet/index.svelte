<script>
import Character from '../../components/rules/Character'
import CharacterSheet from '../../components/views/ui/CharacterSheet.svelte'
import NavBar from '../../components/views/controls/NavBar.svelte'
import api from '../../../utils/api'
import { authUserStore } from '../../stores/netlifyStore'
import { character } from '../../stores/characterStore'


const saveCharacter = () => {
	console.log('SAVING...')
	const jsonChar = JSON.stringify($character)
	window.localStorage.setItem('character', jsonChar)
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
<script>
import Character from '../../components/classes/Character'
import CharacterSheet from '../../components/views/ui/CharacterSheet.svelte'
import NavBar from '../../components/views/controls/NavBar.svelte'
import api from '../../../utils/api'
import { authUserStore } from '../../stores/netlifyStore'
import { character } from '../../stores/characterStore'


const deleteCharacter = () => {
	$character = new Character()
	window.localStorage.removeItem('character')
	window.location.href = '/'
}
</script>


<CharacterSheet/>
<div class='sheet-buttons'>
	<button on:click={deleteCharacter}>
		Delete
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
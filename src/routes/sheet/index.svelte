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
}
</script>


<CharacterSheet/>
<div class='delete-button'>
	<button on:click={deleteCharacter}>
		Delete
	</button>
</div>
<NavBar links={{back: '/', next: '/'}}/>


<style>
.delete-button {
	display: flex;
	justify-content: center;
	margin-top: var(--s100);
}
.delete-button button {
	font-size: var(--s125);
	font-weight: bold;
}
</style>
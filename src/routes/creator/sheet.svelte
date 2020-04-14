<script>
import { character } from '../../stores/characterStore'
import CharacterSheet from '../../components/views/ui/CharacterSheet.svelte'
import NavBar from '../../components/views/controls/NavBar.svelte'
import api from '../../../utils/api'

$character.completed = true

const createMyCharacter = (c) => {
	console.log(c)
	api.createCharacter(c)
}
</script>


<CharacterSheet/>
<div class='save-button'>
	<button on:click={()=>createMyCharacter($character)}>
		Save Character
	</button>
</div>
<NavBar links={{back: '/creator/gear', next: '/'}}/>


<style>
.save-button {
	display: flex;
	justify-content: center;
	margin-top: var(--s100);
}
.save-button button {
	font-size: var(--s150);
	font-weight: bold;
}
</style>
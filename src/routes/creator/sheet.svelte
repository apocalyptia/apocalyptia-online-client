<script>
import { character } from '../../stores/characterStore'
import CharacterSheet from '../../components/views/ui/CharacterSheet.svelte'
import NavBar from '../../components/views/controls/NavBar.svelte'
import api from '../../../utils/api'

$character.completed = true

const createMyCharacter = (c) => {
	console.log(c)
	// api.createCharacter(c)
}
</script>


<CharacterSheet/>
<button on:click={()=>createMyCharacter($character)}>Save</button>
<NavBar links={{back: '/creator/gear', next: '/'}}/>
<script>
import { authUserStore } from '../../stores/netlifyStore'
import { character } from '../../stores/characterStore'
import CharacterSheet from '../../components/views/ui/CharacterSheet.svelte'
import NavBar from '../../components/views/controls/NavBar.svelte'
import api from '../../../utils/api'

const createMyCharacter = (c, u) => {
	console.log('Character: ', c)
	console.log('User: ', u)
}
</script>


<CharacterSheet/>
<div class='save-button'>
	<button on:click={()=>createMyCharacter($character, $authUserStore)}>
		Save Character
	</button>
</div>
<NavBar links={{back: '/', next: '/'}}/>


<style>
.save-button {
	display: flex;
	justify-content: center;
	margin-top: var(--s100);
}
.save-button button {
	font-size: var(--s150);
	font-weight: bold;
	width: 50%;
}
</style>
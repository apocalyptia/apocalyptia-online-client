<script>
import Character from '../../components/classes/Character'
import CharacterSheet from '../../components/views/ui/CharacterSheet.svelte'
import NavBar from '../../components/views/controls/NavBar.svelte'
import api from '../../../utils/api'
import { authUserStore } from '../../stores/netlifyStore'
import { character } from '../../stores/characterStore'

const saveCharacter = () => {
	$character.user = $authUserStore.id
	$character.completed = true
	window.localStorage.setItem('character', JSON.stringify($character))
}

const deleteCharacter = () => {
	$character = new Character()
	window.localStorage.removeItem('character')
}
</script>


<CharacterSheet/>
<div class='save-button'>
	{#if $character.completed}
		<h2>{$character.description.identity.value} saved successfully!</h2>
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
.save-button {
	display: flex;
	justify-content: space-between;
	margin-top: var(--s100);
}
.save-button button {
	font-size: var(--s150);
}
</style>
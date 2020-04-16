<script>
import { character } from '../../stores/characterStore'
import { authUserStore } from '../../stores/netlifyStore'
import CharacterSheet from '../../components/views/ui/CharacterSheet.svelte'
import NavBar from '../../components/views/controls/NavBar.svelte'
import api from '../../../utils/api'

const createMyCharacter = () => {
	$character.user = $authUserStore.id
	window.localStorage.setItem('character', JSON.stringify($character))
	const storedCharacter = window.localStorage.getItem('character')
	const retrievedCharacter = JSON.parse(storedCharacter)
	$character.completed = true
}
</script>


<CharacterSheet/>
<div class='save-button'>
	{#if $character.completed}
		<h2>{$character.description.identity.value} saved successfully!</h2>
	{:else}
		<button on:click={createMyCharacter}>
			Save Character
		</button>
	{/if}
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
}
</style>
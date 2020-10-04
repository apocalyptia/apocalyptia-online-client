<script>
	import Abilities from './Abilities.svelte'
	import Description from './Description.svelte'
	import Gear from './Gear.svelte'
	import Health from './Health.svelte'
	import Notes from './Notes.svelte'
	import Properties from './Properties.svelte'
	import Skills from './Skills.svelte'
	import Traits from './Traits.svelte'
	import DeleteCharacter from '../../helpers/database/DeleteCharacter'
	import LoadCharacter from '../../helpers/database/LoadCharacter'
	import LoadAllCharacters from '../../helpers/database/LoadAllCharacters'
	import SaveCharacter from '../../helpers/database/SaveCharacter'
	import { authUserStore } from '../../stores/netlifyStore'
	import { character } from '../../stores/characterStore'
	import { goto } from '@roxi/routify'

	export let mode

	const createCharacter = () => {
		$character.finalize($authUserStore.id)
		console.log('------------------------------------')
		console.log(`USER = ${$authUserStore.id}`)
		console.log(`SAVE CHARACTER = ${SaveCharacter($character)}`)
		console.log('------------------------------------')
	}

	const deleteCharacter = () => {
		console.log('------------------------------------')
		console.log(`USER = ${$authUserStore.id}`)
		console.log(`SAVE CHARACTER = ${DeleteCharacter($authUserStore.id)}`)
		console.log('------------------------------------')
	}

	const loadCharacter = () => {
		console.log('------------------------------------')
		console.log(`USER = ${$authUserStore.id}`)
		console.log(`LOAD CHARACTER = ${LoadCharacter($authUserStore.id)}`)
		console.log(`LOAD ALL CHARACTERS = ${LoadAllCharacters($authUserStore.id)}`)
		console.log('------------------------------------')
	}
</script>


<div class="character-sheet">
	<Description {mode} />
	<Traits />
	<Skills />
	<Properties {mode} />
	<Health {mode} />
	<Abilities />
	<Gear {mode} />
	<Notes {mode} />
</div>
<div class='btn-row'>
	<button class='small-cntr-btn' on:click={deleteCharacter}>Delete</button>
	<button class='small-cntr-btn' on:click={loadCharacter}>Load</button>
	<button class='small-cntr-btn' on:click={createCharacter}>Save</button>
</div>


<style>
	.character-sheet {
		padding: var(--s100);
	}
</style>
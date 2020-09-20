<script>
	import Abilities from './Abilities.svelte'
	import Character from '../../rules/Character'
	import DeleteCharacter from '../../helpers/database/DeleteCharacter'
	import Description from './Description.svelte'
	import Gear from './Gear.svelte'
	import Health from './Health.svelte'
	import Notes from './Notes.svelte'
	import Properties from './Properties.svelte'
	import SaveCharacter from '../../helpers/database/SaveCharacter'
	import Skills from './Skills.svelte'
	import Traits from './Traits.svelte'
	import { authUserStore } from '../../stores/netlifyStore'
	import { character } from '../../stores/characterStore'
	import { goto } from '@roxi/routify'

	export let mode

	let confirmDelete = false

	const finalizeCharacter = () => {
		console.log('CharacterSheet FINALIZING CHARACTER')
		if (!$character.created) $character.created = new Date()
		$character.meta.user = $authUserStore.id
		$character.meta.completed = true
		$character.meta.step = 7
		$character.meta.modified = new Date()
		console.log('CharacterSheet FINALIZATION COMPLETED')
	}

	const createCharacter = async () => {
		finalizeCharacter()
		let serverResponse = await SaveCharacter($character)
		console.log(`CharacterSheet SERVER RESPONSE = ${serverResponse}`)
		console.log(`CharacterSheet JSON PARSED RESPONSE = ${JSON.parse(serverResponse)}`)
		$goto('/')
		console.log('CharacterSheet RETURNED TO HOME')
	}

	const deleteCharacter = () => {
		let confirmDelete = false
		confirmDelete = confirm('Are you sure you want to delete your character?')
		if (confirmDelete) {
			let serverResponse = DeleteCharacter($authUserStore.id)
			console.log(serverResponse)
			$character = new Character()
			$goto('/')
		}
	}
</script>


<div class="character-sheet">
	<Description {mode} />
	<Traits />
	<Skills />
	<Properties {mode} />
	<Health {mode} />
	<Abilities {mode} />
	<Gear {mode} />
	<Notes {mode} />
</div>
<div class='btn-row'>
	<button class='small-cntr-btn' on:click={deleteCharacter}>Delete</button>
	<button class='small-cntr-btn' on:click={createCharacter}>Save</button>
</div>
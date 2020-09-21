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

	const finalizeCharacter = () => {
		if (!$character.created) $character.created = new Date()
		$character.meta.user = $authUserStore.id
		$character.meta.completed = true
		$character.meta.step = 7
		$character.meta.modified = new Date()
	}

	const createCharacter = async () => {
		finalizeCharacter()
		let serverResponse = await SaveCharacter($character)
		serverResponse.finally(() => {
			console.log(`CharacterSheet JSON PARSED RESPONSE = ${JSON.parse(serverResponse)}`)
			$goto('/')
		})
	}

	const deleteCharacter = () => {
		if (confirm('Are you sure you want to delete your character?')) {
			let serverResponse = DeleteCharacter($authUserStore.id)
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
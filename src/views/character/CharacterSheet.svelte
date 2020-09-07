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

	export let readonly = false

	let confirmDelete = false

	const finalizeCharacter = () => {
		if (!$character.created) $character.created = new Date()
		$character.meta.user = $authUserStore.id
		$character.meta.completed = true
		$character.meta.step = `complete`
		$character.meta.modified = new Date()
	}

	const createCharacter = () => {
		finalizeCharacter()
		$character = SaveCharacter($character)
		$goto('/')
	}

	const deleteCharacter = () => {
		let confirmDelete = false
		confirmDelete = confirm('Are you sure you want to delete your character?')
		if (confirmDelete) {
			DeleteCharacter($authUserStore.id)
			$character = new Character()
			$goto('/')
		}
	}
</script>


<div class="character-sheet">
	<Description />
	<Traits />
	<Skills />
	<Properties {readonly} />
	<Health {readonly} />
	<Abilities {readonly} />
	<Gear {readonly} />
	<Notes />
</div>
<div class='btn-row'>
	<button class='small-cntr-btn' on:click={deleteCharacter}>Delete</button>
	<button class='small-cntr-btn' on:click={createCharacter}>Save</button>
</div>
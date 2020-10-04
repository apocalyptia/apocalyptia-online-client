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
	import SaveCharacter from '../../helpers/database/SaveCharacter'
	import { authUserStore } from '../../stores/netlifyStore'
	import { character } from '../../stores/characterStore'
	import { goto } from '@roxi/routify'

	export let mode

	const createCharacter = () => {
		$character.finalize($authUserStore.id)
		$character = SaveCharacter($character)
		$goto('/')
	}

	const deleteCharacter = () => {
		if (confirm('Are you sure you want to delete your character?')) {
			$character = DeleteCharacter($authUserStore.id)
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
	<Abilities />
	<Gear {mode} />
	<Notes {mode} />
</div>
<div class='btn-row'>
	<button class='small-cntr-btn' on:click={deleteCharacter}>Delete</button>
	<button class='small-cntr-btn' on:click={createCharacter}>Save</button>
</div>
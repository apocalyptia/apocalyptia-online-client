<script>
	import Abilities from 'src/components/views/character/sheet/Abilities.svelte'
	import Character from 'src/components/rules/Character'
	import DeleteCharacter from 'src/components/helpers/database/DeleteCharacter'
	import Description from 'src/components/views/character/sheet/Description.svelte'
	import Gear from 'src/components/views/character/sheet/Gear.svelte'
	import Health from 'src/components/views/character/sheet/Health.svelte'
	import Notes from 'src/components/views/character/sheet/Notes.svelte'
	import Properties from 'src/components/views/character/sheet/Properties.svelte'
	import SaveCharacter from 'src/components/helpers/database/SaveCharacter'
	import Skills from 'src/components/views/character/sheet/Skills.svelte'
	import Traits from 'src/components/views/character/sheet/Traits.svelte'
	import { authUserStore } from 'src/stores/netlifyStore'
	import { character } from 'src/stores/characterStore'
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
		console.log(`Confirm delete = ${confirmDelete}`)
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
<div class='sheet-buttons'>
	<button class='sheet-button' on:click={deleteCharacter}>
		Delete
	</button>
	<button class='sheet-button' on:click={createCharacter}>
		Save
	</button>
</div>


<style>
	.sheet-buttons {
		display: flex;
		justify-content: space-bsetween;
		margin-top: var(--s100);
	}
	.sheet-button {
		font-size: var(--s125);
		font-weight: bold;
		width: calc(100% / 3);
	}
</style>
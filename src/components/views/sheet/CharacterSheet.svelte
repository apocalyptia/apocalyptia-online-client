<script>
	import Abilities from '../sheet/Abilities.svelte'
	import DeleteCharacter from '../../helpers/database/DeleteCharacter'
	import Description from '../sheet/Description.svelte'
	import Gear from '../sheet/Gear.svelte'
	import Health from '../sheet/Health.svelte'
	import Notes from '../sheet/Notes.svelte'
	import Properties from '../sheet/Properties.svelte'
	import SaveCharacter from '../../helpers/database/SaveCharacter'
	import Skills from '../sheet/Skills.svelte'
	import Traits from '../sheet/Traits.svelte'
	import { authUserStore } from '../../../stores/netlifyStore'
	import { character } from '../../../stores/characterStore'
	import { goto } from '@roxi/routify'

	export let readonly = false

	const saveCharacter = () => {
		$character = SaveCharacter($authUserStore.id, $character)
		$goto('/')
	}

	const deleteCharacter = () => {
		$character = DeleteCharacter($authUserStore.id, $character)
		$goto('/')
	}
</script>


<div class="character-sheet">
	<Description />
	<Traits />
	<Skills />
	<Properties {readonly} />
	<Health {readonly} />
	<Abilities />
	<Gear {readonly} />
	<Notes />
</div>
<div class='sheet-buttons'>
	<button on:click={deleteCharacter}>
		Delete
	</button>
	<button on:click={saveCharacter}>
		Save
	</button>
</div>


<style>
	.sheet-buttons {
		display: flex;
		justify-content: space-between;
		margin-top: var(--s100);
	}
	.sheet-buttons button {
		font-size: var(--s125);
		font-weight: bold;
		width: calc(100% / 3);
	}
</style>
<script>
	import Abilities from './Abilities.svelte'
	import DeleteCharacterButton from './DeleteCharacterButton.svelte'
	import Description from './Description.svelte'
	import Gear from './Gear.svelte'
	import Health from './Health.svelte'
	import LoadCharacterButton from './LoadCharacterButton.svelte'
	import Notes from './Notes.svelte'
	import Properties from './Properties.svelte'
	import SaveCharacterButton from './SaveCharacterButton.svelte'
	import Skills from './Skills.svelte'
	import Traits from './Traits.svelte'

	export let mode
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
	<DeleteCharacterButton />
	<LoadCharacterButton />
	<SaveCharacterButton />
</div>


<style>
	.character-sheet {
		padding: var(--s100);
	}
</style>
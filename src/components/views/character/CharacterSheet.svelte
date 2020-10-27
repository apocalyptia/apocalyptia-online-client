<script>
	import Abilities from 'views/character/Abilities.svelte'
	import DeleteCharacterButton from 'views/character/DeleteCharacterButton.svelte'
	import Description from 'views/character/Description.svelte'
	import Gear from 'views/character/Gear.svelte'
	import Health from 'views/character/Health.svelte'
	import LoadCharacterButton from 'views/character/LoadCharacterButton.svelte'
	import Notes from 'views/character/Notes.svelte'
	import Properties from 'views/character/Properties.svelte'
	import SaveCharacterButton from 'views/character/SaveCharacterButton.svelte'
	import Skills from 'views/character/Skills.svelte'
	import Traits from 'views/character/Traits.svelte'

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
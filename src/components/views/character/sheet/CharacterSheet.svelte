<script>
	import Abilities from 'views/character/Abilities.svelte'
	import DeleteCharacterButton from 'views/character/sheet/DeleteCharacterButton.svelte'
	import Description from 'views/character/sheet/Description.svelte'
	import Gear from 'views/character/sheet/Gear.svelte'
	import Health from 'views/character/sheet/Health.svelte'
	import LoadCharacterButton from 'views/character/LoadCharacterButton.svelte'
	import Notes from 'views/character/sheet/Notes.svelte'
	import Properties from 'views/character/sheet/Properties.svelte'
	import SaveCharacterButton from 'views/character/sheet/SaveCharacterButton.svelte'
	import Skills from 'views/character/sheet/Skills.svelte'
	import Traits from 'views/character/sheet/Traits.svelte'

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
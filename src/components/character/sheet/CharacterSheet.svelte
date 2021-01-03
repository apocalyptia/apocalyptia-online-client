<script>
	import Abilities from 'components/character/Abilities.svelte'
	import Description from 'components/character/sheet/Description.svelte'
	import Gear from 'components/character/sheet/Gear.svelte'
	import Health from 'components/character/sheet/Health.svelte'
	import Notes from 'components/character/sheet/Notes.svelte'
	import Properties from 'components/character/sheet/Properties.svelte'
	import Skills from 'components/character/sheet/Skills.svelte'
	import Traits from 'components/character/sheet/Traits.svelte'

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
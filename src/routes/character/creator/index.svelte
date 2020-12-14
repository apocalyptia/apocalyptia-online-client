<script>
	import Character from 'classes/Character.js'
	import Abilities from 'creator/abilities.svelte'
	import Description from 'creator/description.svelte'
	import Finalize from 'creator/finalize.svelte'
	import Gear from 'creator/gear.svelte'
	import NavBar from 'views/character/creator/NavBar.svelte'
	import Properties from 'creator/properties.svelte'
	import Skills from 'creator/skills.svelte'
	import Traits from 'creator/traits.svelte'
	import { character } from 'stores/characterStore.js'
	import { onMount } from 'svelte'

	onMount(_ => $character = new Character())

	const creatorPages = [
		Description,
		Traits,
		Skills,
		Properties,
		Abilities,
		Gear,
		Finalize
	]

	$: step = $character.meta.step
</script>


<div id='character-creator' class='creator-page page-body'>
	<svelte:component this={creatorPages[step]} />
</div>
<NavBar />


<style>
	.creator-page {
		bottom: var(--std-input-height);
	}
</style>
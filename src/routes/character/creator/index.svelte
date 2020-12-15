<script>
	import Character from 'classes/Character.js'
	import NavBar from 'views/character/creator/NavBar.svelte'
	import Skills from 'rules/Skills.js'
	import Traits from 'rules/Traits.js'
	import abilities from 'creator/abilities.svelte'
	import description from 'creator/description.svelte'
	import finalize from 'creator/finalize.svelte'
	import gear from 'creator/gear.svelte'
	import properties from 'creator/properties.svelte'
	import skills from 'creator/skills.svelte'
	import traits from 'creator/traits.svelte'
	import { character } from 'stores/characterStore.js'
	import { onMount } from 'svelte'

	onMount(_ => $character = new Character())

	const creatorPages = [
		description,
		traits,
		skills,
		properties,
		abilities,
		gear,
		finalize
	]

	const proceedConditions = _ => {
		return (
			($character.meta.step == 0 && Object.values($character.description).some(d => d.value == ``)) ||
			($character.meta.step == 1 && Traits.remaining($character) != 0) ||
			($character.meta.step == 2 && Skills.remaining($character) != 0) ||
			($character.meta.step == 4 && $character.properties.xp.current < 0) ||
			($character.meta.step == 5 && Object.values($character.gear).some(g => g.inventory.length == 0))
		)
	}

	$: step = $character.meta.step
</script>


<div id='character-creator' class='creator-page page-body'>
	<svelte:component this={creatorPages[step]} />
</div>
<NavBar {proceedConditions} limit={creatorPages.length} />


<style>
	.creator-page {
		bottom: var(--std-input-height);
	}
</style>
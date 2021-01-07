<script>
	import Character from 'classes/Character.js'
	import NavBar from 'components/buttons/NavBar.svelte'
	import Skills from 'rules/Skills.js'
	import Traits from 'rules/Traits.js'
	import abilities from 'character/creator/abilities.svelte'
	import description from 'character/creator/description.svelte'
	import finalize from 'character/creator/finalize.svelte'
	import gear from 'character/creator/gear.svelte'
	import properties from 'character/creator/properties.svelte'
	import skills from 'character/creator/skills.svelte'
	import traits from 'character/creator/traits.svelte'
	import { characterStore } from 'stores/characterStore.js'
	import { onMount } from 'svelte'

	onMount(_ => $characterStore = new Character())

	const creationSteps = [
		description,
		traits,
		skills,
		properties,
		abilities,
		gear,
		finalize,
	]

	const proceedConditions = _ => {
		const step = $characterStore.meta.step
		const descriptionArray = Object.values($characterStore.description)
		const currentXP = $characterStore.properties.xp.current
		const gearArray = Object.values($characterStore.gear)
		return (
			(step == 0 && descriptionArray.some(d => d.value == ``)) ||
			(step == 1 && Traits.remaining($characterStore)) ||
			(step == 2 && Skills.remaining($characterStore)) ||
			(step == 4 && currentXP < 0) ||
			(step == 5 && gearArray.some(g => g.inventory.length == 0))
		)
	}

	$: step = $characterStore.meta.step
</script>


<div id='character-creator' class='creator-page page-body'>
	<svelte:component this={creationSteps[step]} />
</div>
<NavBar {proceedConditions} />


<style>
	.creator-page {
		padding-bottom: calc(var(--square) + var(--std-padding));
	}
</style>
<script>
	import AbilitiesStep from 'components/character/creator/steps/AbilitiesStep.svelte'
	import Character from 'classes/Character.js'
	import DescriptionStep from 'components/character/creator/steps/DescriptionStep.svelte'
	import FinalizeStep from 'components/character/creator/steps/FinalizeStep.svelte'
	import GearStep from 'components/character/creator/steps/GearStep.svelte'
	import NavBar from 'components/character/creator/NavBar.svelte'
	import PropertiesStep from 'components/character/creator/steps/PropertiesStep.svelte'
	import Skills from 'rules/Skills.js'
	import SkillsStep from 'components/character/creator/steps/SkillsStep.svelte'
	import Traits from 'rules/Traits.js'
	import TraitsStep from 'components/character/creator/steps/TraitsStep.svelte'
	import characterStore from 'stores/characterStore.js'
	import { onMount } from 'svelte'

	onMount(_ => $characterStore = new Character())

	const creationSteps = [
		DescriptionStep,
		TraitsStep,
		SkillsStep,
		PropertiesStep,
		AbilitiesStep,
		GearStep,
		FinalizeStep,
	]

	$: proceedConditions = _ => {
		const step = $characterStore.meta.step
		const currentXP = $characterStore.properties.xp.current
		const gearArray = Object.values($characterStore.gear)
		return (
			(step == 0 && Object.values($characterStore.description).some(d => !d.value)) ||
			(step == 1 && Traits.remaining($characterStore)) ||
			(step == 2 && Skills.remaining($characterStore)) ||
			(step == 4 && currentXP < 0) ||
			(step == 5 && gearArray.some(g => g.inventory.length == 0))
		)
	}

	$: limit = creationSteps.length - 1
</script>


<div id='character-creator' class='page-body'>
	<svelte:component this={creationSteps[$characterStore.meta.step]}	/>
</div>
<NavBar {proceedConditions} {limit} />
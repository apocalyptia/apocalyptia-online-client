<script>
	import AbilitiesStep from '/src/components/character/creator/steps/AbilitiesStep.svelte'
	import DescriptionStep from '/src/components/character/creator/steps/DescriptionStep.svelte'
	import FinalizeStep from '/src/components/character/creator/steps/FinalizeStep.svelte'
	import GearStep from '/src/components/character/creator/steps/GearStep.svelte'
	import NavBar from '/src/components/character/creator/NavBar.svelte'
	import PropertiesStep from '/src/components/character/creator/steps/PropertiesStep.svelte'
	import SkillsStep from '/src/components/character/creator/steps/SkillsStep.svelte'
	import TraitsStep from '/src/components/character/creator/steps/TraitsStep.svelte'
	import characterStore from '/src/stores/characterStore.js'

	const creationSteps = [
		TraitsStep,
		SkillsStep,
		PropertiesStep,
		AbilitiesStep,
		GearStep,
		DescriptionStep,
		FinalizeStep
	]
</script>


<div id='character-creator' class='page-body'>
	<svelte:component this={creationSteps[$characterStore.step]} />
</div>
<NavBar />


<style>
	#character-creator {
		bottom: calc(var(--square) + 2px);
	}
</style>
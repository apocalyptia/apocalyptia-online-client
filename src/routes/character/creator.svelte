<script>
	import NavBar from '/src/components/character/creator/navbar/NavBar.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import PropertiesStep from '/src/components/character/creator/steps/PropertiesStep.svelte'
	import SkillsStep from '/src/components/character/creator/steps/SkillsStep.svelte'
	import TraitsStep from '/src/components/character/creator/steps/TraitsStep.svelte'
	import AbilitiesStep from '/src/components/character/creator/steps/AbilitiesStep.svelte'
	import DescriptionStep from '/src/components/character/creator/steps/DescriptionStep.svelte'
	import GearStep from '/src/components/character/creator/steps/GearStep.svelte'

	const creationSteps = [
		TraitsStep,
		SkillsStep,
		PropertiesStep,
		AbilitiesStep,
		GearStep,
		DescriptionStep,
	]
</script>


<div id="character-creator" class="page-body">
	<svelte:component this={creationSteps[$characterStore.meta.step - 1]} />
</div>
<NavBar />


<style>
	#character-creator {
		bottom: calc(var(--square) + 2px);
	}
</style>

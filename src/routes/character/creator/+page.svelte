<script>
	import NavBar from '$components/character/creator/navbar/NavBar.svelte'
	import characterStore from '$stores/characterStore.js'
	import PropertiesStep from '$components/character/creator/steps/PropertiesStep.svelte'
	import SkillsStep from '$components/character/creator/steps/SkillsStep.svelte'
	import TraitsStep from '$components/character/creator/steps/TraitsStep.svelte'
	import AbilitiesStep from '$components/character/creator/steps/AbilitiesStep.svelte'
	import DescriptionStep from '$components/character/creator/steps/DescriptionStep.svelte'
	import GearStep from '$components/character/creator/steps/GearStep.svelte'

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

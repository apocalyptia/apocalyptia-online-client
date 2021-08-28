<script>
	import AbilitiesStep from '/src/components/character/creator/steps/AbilitiesStep.svelte'
	import DescriptionStep from '/src/components/character/creator/steps/DescriptionStep.svelte'
	import GearStep from '/src/components/character/creator/steps/GearStep.svelte'
	import PropertiesStep from '/src/components/character/creator/steps/PropertiesStep.svelte'
	import SkillsStep from '/src/components/character/creator/steps/SkillsStep.svelte'
	import TraitsStep from '/src/components/character/creator/steps/TraitsStep.svelte'
	import NavBar from '/src/components/character/creator/navbar/NavBar.svelte'
	import creationStore from '/src/stores/creationStore.js'
	import { onMount } from 'svelte'

	const CreationProcess = [
		TraitsStep,
		SkillsStep,
		PropertiesStep,
		AbilitiesStep,
		GearStep,
		DescriptionStep,
	]

	onMount(() => {
		$creationStore.step = 0
		$creationStore.numberOfSteps = CreationProcess.length - 1
	})
</script>


<div id="character-creator" class="page-body">
	<svelte:component this={CreationProcess[$creationStore.step]} />
</div>
<NavBar />

<style>
	#character-creator {
		bottom: calc(var(--square) + 2px);
	}
</style>

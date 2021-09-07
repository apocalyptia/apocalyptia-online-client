<script>
	import CreationProcess from '/src/rules/CreationProcess.js'
	import ExplanationBlock from '/src/components/character/creator/ExplanationBlock.svelte'
	import PageHeader from '/src/components/character/creator/PageHeader.svelte'
	import PointsRemaining from '/src/components/character/creator/PointsRemaining.svelte'
	import ResetAndRandomButtonRow from '/src/components/character/creator/ResetAndRandomButtonRow.svelte'
	import SkillsSection from '/src/components/character/sheet/sections/SkillsSection.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import { onMount, beforeUpdate } from 'svelte'

	function randomSkills() {
		$characterStore = $characterStore.randomSkills()
	}

	function resetSkills() {
		$characterStore = $characterStore.resetSkills()
	}

	onMount(() => $characterStore = $characterStore.remainingSkills())

	beforeUpdate(() => $characterStore = $characterStore.creationCanProceed())
</script>


<div class="skills-step-page">
	<fieldset>
		<PageHeader chapter={'Skills'} />
		<ExplanationBlock rule={CreationProcess.skills.description} />
		<PointsRemaining points={$characterStore.meta.skillsRemaining} />
		<SkillsSection mode='write' />
		<ResetAndRandomButtonRow reset={() => resetSkills()} random={() => randomSkills()} />
	</fieldset>
</div>

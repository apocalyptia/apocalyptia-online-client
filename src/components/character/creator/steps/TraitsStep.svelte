<script>
	import CreationProcess from '/src/rules/CreationProcess.js'
	import ExplanationBlock from '/src/components/character/creator/ExplanationBlock.svelte'
	import PageHeader from '/src/components/character/creator/PageHeader.svelte'
	import PointsRemaining from '/src/components/character/creator/PointsRemaining.svelte'
	import ResetAndRandomButtonRow from '/src/components/character/creator/ResetAndRandomButtonRow.svelte'
	import TraitsSection from '/src/components/character/sheet/sections/TraitsSection.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import { onMount } from 'svelte'

	function randomTraits() {
		$characterStore = $characterStore.randomTraits()
		$characterStore = $characterStore.creationCanProceed()
	}

	function resetTraits() {
		$characterStore = $characterStore.resetTraits()
		$characterStore = $characterStore.creationCanProceed()
	}

	onMount(() => $characterStore = $characterStore.remainingTraits())
</script>


<div class="traits-step-page">
	<fieldset>
		<PageHeader chapter={'Traits'} />
		<ExplanationBlock rule={CreationProcess.traits.description} />
		<PointsRemaining points={$characterStore.meta.traitsRemaining} />
		<div class="section-card">
			<TraitsSection mode='write' />
		</div>
		<ResetAndRandomButtonRow reset={() => resetTraits()} random={() => randomTraits()} />
	</fieldset>
</div>

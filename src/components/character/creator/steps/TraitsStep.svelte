<script>
	import CreationProcess from '$rules/CreationProcess.js'
	import ExplanationBlock from '$components/character/creator/ExplanationBlock.svelte'
	import PageHeader from '$components/character/creator/PageHeader.svelte'
	import PointsRemaining from '$components/character/creator/PointsRemaining.svelte'
	import ResetAndRandomButtonRow from '$components/character/creator/ResetAndRandomButtonRow.svelte'
	import TraitsSection from '$components/character/sheet/sections/TraitsSection.svelte'
	import characterStore from '$stores/characterStore.js'
	import { onMount, beforeUpdate } from 'svelte'

	function randomTraits() {
		$characterStore = $characterStore.randomTraits()
	}

	function resetTraits() {
		$characterStore = $characterStore.resetTraits()
	}

	onMount(() => $characterStore = $characterStore.remainingTraits())

	beforeUpdate(() => $characterStore = $characterStore.creationCanProceed())
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

<script>
	import AbilitiesList from '/src/components/character/creator/abilities/AbilitiesList.svelte'
	import Creation from '/src/rules/Creation.js'
	import ExplanationBlock from '/src/components/character/creator/ExplanationBlock.svelte'
	import OrganizerBar from '/src/components/character/creator/abilities/OrganizerBar.svelte'
	import PageHeader from '/src/components/character/creator/PageHeader.svelte'
	import PointsRemaining from '/src/components/character/creator/PointsRemaining.svelte'
	import ResetAndRandomButtonRow from '/src/components/character/creator/ResetAndRandomButtonRow.svelte'
	import abilitiesStore from '/src/stores/abilitiesStore.js'
	import characterStore from '/src/stores/characterStore.js'
	import { afterUpdate } from 'svelte'

	function randomAbilities() {
		$abilitiesStore.reset()
		$abilitiesStore = $abilitiesStore
		$characterStore.randomAbilities()
		$characterStore = $characterStore
	}

	function resetAbilities() {
		$abilitiesStore.reset()
		$abilitiesStore = $abilitiesStore
		$characterStore.resetAbilities()
		$characterStore = $characterStore
	}

	afterUpdate(() => {
		$characterStore.resetAbilities()
		$characterStore.abilities = $abilitiesStore.visibleList.filter((a) => a.quantity)
		$characterStore.updateProperties()
		$characterStore = $characterStore
	})
</script>


<div class="abilities-step-page">
	<fieldset>
		<PageHeader chapter={'Abilities'} step={$characterStore.step} />
		<ExplanationBlock rule={Creation.abilities.description} />
		<PointsRemaining points={$characterStore.properties.experience.current} />
		<OrganizerBar />
		<AbilitiesList />
		<ResetAndRandomButtonRow reset={() => resetAbilities()} random={() => randomAbilities()} />
	</fieldset>
</div>

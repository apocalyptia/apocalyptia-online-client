<script>
	import AbilitiesList from '/src/components/character/creator/abilities/AbilitiesList.svelte'
	import Creation from '/src/rules/Creation.js'
	import CurrentAbilities from '/src/components/character/creator/abilities/CurrentAbilities.svelte'
	import ExplanationBlock from '/src/components/character/creator/ExplanationBlock.svelte'
	import PageHeader from '/src/components/character/creator/PageHeader.svelte'
	import PointsRemaining from '/src/components/character/creator/PointsRemaining.svelte'
	import ResetAndRandomButtonRow from '/src/components/buttons/ResetAndRandomButtonRow.svelte'
	import characterStore from '/src/stores/characterStore.js'

	function randomAbilities() {
		$characterStore.randomAbilities()
		$characterStore = $characterStore
	}

	function resetAbilities() {
		$characterStore.resetAbilities()
		$characterStore = $characterStore
	}
</script>

<div class="abilities-step-page">
	<fieldset>
		<PageHeader chapter={'Abilities'} step={$characterStore.step} />
		<ExplanationBlock rule={Creation.abilities.desc} />
		<PointsRemaining points={$characterStore.properties.experience.current} />
		{#if $characterStore.abilities.length}
			<div class="section-card">
				<CurrentAbilities />
			</div>
		{/if}
		<div class="section-card">
			<AbilitiesList />
		</div>
		<ResetAndRandomButtonRow reset={() => resetAbilities()} random={() => randomAbilities()} />
	</fieldset>
</div>

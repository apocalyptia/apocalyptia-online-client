<script>
	import Creation from '/src/rules/Creation.js'
	import ExplanationBlock from '/src/components/character/creator/ExplanationBlock.svelte'
	import PageHeader from '/src/components/character/creator/PageHeader.svelte'
	import PointsRemaining from '/src/components/character/creator/PointsRemaining.svelte'
	import ResetAndRandomButtonRow from '/src/components/character/creator/ResetAndRandomButtonRow.svelte'
	import Slider from '/src/components/widgets/Slider.svelte'
	import characterStore from '/src/stores/characterStore.js'

	function randomTraits() {
		$characterStore.randomTraits()
		$characterStore = $characterStore
	}

	function resetTraits() {
		$characterStore.resetTraits()
		$characterStore = $characterStore
	}

	function updateTrait(trait) {
		$characterStore.updateTrait(trait)
		$characterStore = $characterStore
	}
</script>

<div class="traits-step-page">
	<fieldset>
		<PageHeader chapter={'Traits'} step={$characterStore.step} />
		<ExplanationBlock rule={Creation.traits.description} />
		<PointsRemaining points={$characterStore.traitsRemaining} />
		<div class="section-card">
			{#each Object.values($characterStore.traits) as trait}
				<div class="item-block">
					<div class="trait-selection">
						<h2>
							{trait.name}
							<h2>
								<div class="stat-column">
									<Slider name={trait.name} type={'trait'} min="1" max={$characterStore.maxTraits} bind:value={trait.score} func={() => updateTrait(trait)} indicator="true" />
								</div>
							</h2>
						</h2>
					</div>
				</div>
			{/each}
		</div>
		<ResetAndRandomButtonRow reset={() => resetTraits()} random={() => randomTraits()} />
	</fieldset>
</div>

<style>
	.trait-selection {
		padding: var(--padding) 0;
	}
</style>

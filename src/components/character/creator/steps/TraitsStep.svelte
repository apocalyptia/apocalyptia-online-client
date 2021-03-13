<script>
	import Creation from 'rules/Creation.js'
	import ExplanationBlock from 'components/character/creator/ExplanationBlock.svelte'
	import PageHeader from 'components/character/creator/PageHeader.svelte'
	import PointsRemaining from 'components/character/creator/PointsRemaining.svelte'
	import RandomTraits from 'rules/random/RandomTraits.js'
	import ResetAndRandomButtonRow from 'components/buttons/ResetAndRandomButtonRow.svelte'
	import Slider from 'components/widgets/Slider.svelte'
	import Traits from 'rules/Traits.js'
	import TraitsList from 'rules/lists/TraitsList.js'
	import characterStore from 'stores/characterStore.js'

	$: remaining = Traits.remaining($characterStore)

	const updateTrait = (event) => {
		$characterStore = Traits.assign($characterStore, event.target)
		Creation.proceedCheck($characterStore)
	}
</script>


<div class='traits-step-page'>
	<PageHeader chapter={'Traits'} step={$characterStore.meta.step} />
	<ExplanationBlock rule={Traits} />
	<PointsRemaining points={remaining} />
	<div class='section-card'>
		{#each TraitsList.list as trait}
			<div class='item-block'>
				<div class='trait-selection'>
					<div class='stat-label'>{trait.name}</div>
					<div class='stat-column'>
						<Slider
							name='{trait.name.toLowerCase()}'
							min={parseInt(1)}
							max={parseInt(Traits.maxPoints)}
							bind:value={$characterStore.traits[trait.name.toLowerCase()].score}
							on:input={(event) => updateTrait(event)}
							indicator=true
						/>
					</div>
				</div>
			</div>
		{/each}
	</div>
	<ResetAndRandomButtonRow
		reset={_ => $characterStore = $characterStore.resetTraits()}
		random={_ => $characterStore = RandomTraits($characterStore)}
	/>
</div>


<style>
	.trait-selection {
		padding: var(--std-padding) 0;
	}
</style>
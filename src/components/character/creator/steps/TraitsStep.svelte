<script>
	import Creation from 'rules/Creation.js'
	import ExplanationBlock from 'components/character/creator/ExplanationBlock.svelte'
	import PageHeader from 'components/character/creator/PageHeader.svelte'
	import PointsRemaining from 'components/character/creator/PointsRemaining.svelte'
	import RandomTraits from 'rules/random/RandomTraits.js'
	import ResetAndRandomButtonRow from 'components/character/creator/ResetAndRandomButtonRow.svelte'
	import SaveCharacter from 'database/characters/SaveCharacter.js'
	import Slider from 'components/widgets/Slider.svelte'
	import Traits from 'rules/Traits.js'
	import TraitsList from 'rules/lists/TraitsList.js'
	import characterStore from 'stores/characterStore.js'

	$: remaining = Traits.remaining($characterStore)

	const changeTrait = (event) => {
		$characterStore = Traits.assign($characterStore, event.target)
		SaveCharacter()
	}

	const resetTraits = _ => {
		$characterStore = Creation.resetTraits($characterStore)
		SaveCharacter()
	}

	const randomTraits = _ => {
		$characterStore = RandomTraits($characterStore)
		SaveCharacter()
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
							on:input={(event) => changeTrait(event)}
							indicator=true
						/>
					</div>
				</div>
			</div>
		{/each}
	</div>
	<ResetAndRandomButtonRow reset={resetTraits} random={randomTraits} />
</div>


<style>
	.trait-selection {
		padding: var(--std-padding) 0;
	}
</style>
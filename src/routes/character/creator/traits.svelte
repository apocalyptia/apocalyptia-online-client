<script>
	import ButtonRow from 'views/character/creator/ButtonRow.svelte'
	import ExplanationBlock from 'views/character/creator/ExplanationBlock.svelte'
	import PageHeader from 'views/character/creator/PageHeader.svelte'
	import PointsRemaining from 'views/character/creator/PointsRemaining.svelte'
	import RandomTraits from 'random/RandomTraits.js'
	import Slider from 'views/widgets/Slider.svelte'
	import Traits from 'rules/Traits.js'
	import TraitsList from 'lists/TraitsList.js'
	import { character } from 'stores/characterStore.js'

	$: remaining = Traits.remaining($character)
</script>


<div class='traits-step-page'>
	<PageHeader chapter={'Traits'} step={$character.meta.step} />
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
							bind:value={$character.traits[trait.name.toLowerCase()].score}
							on:input={(event) => $character = Traits.assign($character, event.target)}
						/>
					</div>
				</div>
			</div>
		{/each}
	</div>
	<ButtonRow
		reset={_ => $character = $character.resetTraits()}
		random={_ => $character = RandomTraits($character)}
	/>
</div>


<style>
	.trait-selection {
		padding: var(--std-padding) 0;
	}
</style>
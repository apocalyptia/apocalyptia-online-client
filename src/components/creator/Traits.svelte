<script>
	import { fade } from 'svelte/transition'
	import { capitalize } from '../../helpers/Capitalize'
	import { random } from '../../helpers/Random'
	import { character } from '../../stores'
	import { startingTraitPoints } from '../rules/Traits'

	const traits = Object.keys($character.traits)

	$: spentTraitPoints = Object.values($character.traits).reduce((t, { base }) => t += base, 0)
	$: remaining = startingTraitPoints - spentTraitPoints

	const modifyTrait = (trait) => {
		if (remaining < 0) reduceTrait(trait)
		calculateResults()
	}

	const reduceTrait = (trait) => {
		do {
			$character.traits[trait.name].base -= 1
			spentTraitPoints -= 1
			remaining += 1
		} while (remaining < 0 && $character.traits[trait.name].base > 1)
	}

	const randomTraits = () => {
		traits.forEach((trait) => {$character.traits[trait].base = 1})
		while(remaining > 0) $character.traits[random(traits)].base += 1
		calculateResults()
	}

	const calculateResults = () => {
		traits.forEach((trait) => {
			$character.traits[trait].set()
			Object.keys($character.skills).forEach((skill) => {
				if ($character.skills[skill].parent === capitalize(trait)) {
					$character.skills[skill].max = $character.traits[trait].base
				}
			})
		})
		$character.updateProps()
	}
</script>

<div class='traits-step' in:fade>
	<div class='step-title'>
		<h2>Traits</h2>
	</div>
	<div class='remaining'>
		<h3>Points Remaining: {remaining}</h3>
	</div>
	<div class='trait-list'>
		{#each traits as trait}
			<div class='stat-block'>
				<div>
					<span class='stat-label'>{$character.traits[trait].name}</span>
				</div>
				<div class='stat-column'>
					<div class='range-block'>
						<input
							type='range'
							name='{$character.traits[trait].name.toLowerCase()}'
							min=1
							max=6
							bind:value={$character.traits[trait].base}
							invalid={remaining < 0}
							on:change|preventDefault={(event) => modifyTrait(event.target)}
						>
						<div class='range-indicator'>
							<div class='range-number trait-1'>1</div>
							<div class='range-number trait-2'>2</div>
							<div class='range-number trait-3'>3</div>
							<div class='range-number trait-4'>4</div>
							<div class='range-number trait-5'>5</div>
							<div class='range-number trait-6'>6</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
	<button class='center-button' on:change={randomTraits}>Random Traits</button>
</div>

<style>
	@media only screen and (max-width: 500px) {
		.stat-block {
			display: block;
		}
		.stat-column {
			width: 100%;
		}
	}
	@media only screen and (min-width: 500px) {
		.stat-column {
			width: 50%;
		}
	}
	.trait-list {
		margin-top: 1rem;
	}
	.remaining,
	.stat-label {
		text-align: center;
	}
	.trait-1 {
		text-align: left;
	}
	.trait-2 {
		text-indent: 30%;
	}
	.trait-3 {
		text-indent: 40%;
	}
	.trait-4 {
		text-indent: 50%;
	}
	.trait-5 {
		text-indent: 60%;
	}
	.trait-6 {
		text-align: right;
	}
</style>
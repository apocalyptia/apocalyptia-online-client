<script>
	import { fade } from 'svelte/transition'
	import { capitalize } from '../../helpers/Capitalize'
	import { random } from '../../helpers/Random'
	import { character } from '../../stores'
	import { startingTraitPoints, traitMax } from '../rules/Traits'


	const traits = Object.keys($character.traits)

	let remaining = startingTraitPoints - traits.length

	const sumTraits = () => {
		remaining = startingTraitPoints - Object.values($character.traits).reduce((t, { base }) => t += base, 0)
	}

	const modifyTrait = (trait) => {
		sumTraits()
		while (remaining < 0) {
			$character.traits[trait].base--
			sumTraits()
		}
		calculateResults()
	}

	const resetTraits = () => {
		Object.keys($character.traits).forEach((trait) => $character.traits[trait].base = 1)
		sumTraits()
	}

	const randomTraits = () => {
		resetTraits()
		while(remaining > 0) {
			let trait = random(traits)
			if ($character.traits[trait].base < traitMax) {
				$character.traits[random(traits)].base++
				sumTraits()
			}
		}
		calculateResults()
	}

	const calculateResults = () => {
		sumTraits()
		Object.keys($character.traits).forEach((trait) => {
			$character.setStat('traits', trait)
			Object.keys($character.skills).forEach((skill) => {
				if ($character.skills[skill].parent == capitalize(trait)) {
					$character.skills[skill].max = $character.traits[trait].base
				}
			})
		})
		$character.updateProperties()
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
			<div class='section-card'>
				<div>
					<span class='stat-label'>{capitalize(trait)}</span>
				</div>
				<div class='stat-column'>
					<div class='range-block'>
						<input
							type='range'
							name='{trait.toLowerCase()}'
							min=1
							max={traitMax}
							bind:value={$character.traits[trait].base}
							on:change|preventDefault={() => {modifyTrait(trait)}}
						>
						<div class='range-indicator'>
							{#each Array(traitMax) as _, i}
								<div class='range-number trait-{i+1}'>{i+1}</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
	<button
		class='center-button'
		on:click={resetTraits}
	>
		Reset Traits
	</button>
	<button
		class='center-button'
		on:click={randomTraits}
	>
		Random Traits
	</button>
</div>

<style>
	@media only screen and (max-width: 500px) {
		.section-card {
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
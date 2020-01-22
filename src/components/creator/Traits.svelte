<script>
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import { capitalize } from '../../helpers/Capitalize'
	import { random } from '../../helpers/Random'
	import { character } from '../../stores'
	import {
		startingTraitPoints,
		traitMax,
		TraitExplanation
	} from '../rules/Traits'


	const traits = Object.keys($character.traits)

	let remaining = startingTraitPoints - traits.length

	const sumTraits = () => {
		remaining = startingTraitPoints - 
		Object.values($character.traits).reduce(
			(t, { base }) => t += base, 0
		)
	}

	const modifyTrait = (t) => {
		sumTraits()
		while (remaining < 0) {
			$character.traits[t].base--
			sumTraits()
		}
		calculateResults()
	}

	const resetTraits = () => {
		Object.keys($character.traits).forEach(
			(t) => $character.traits[t].base = 1
		)
		sumTraits()
	}

	const randomTraits = () => {
		resetTraits()
		while(remaining > 0) {
			let t = random(traits)
			if ($character.traits[t].base < traitMax) {
				$character.traits[random(traits)].base++
				sumTraits()
			}
		}
		calculateResults()
	}

	const calculateResults = () => {
		sumTraits()
		Object.keys($character.traits).forEach((t) => {
			$character.setStat('traits', t)
			Object.keys($character.skills).forEach((s) => {
				if ($character.skills[s].parent == capitalize(t)) {
					$character.skills[s].max = $character.traits[t].base
				}
			})
		})
		$character.updateProperties()
	}

	onMount(() => {
		calculateResults()
	})
</script>

<div class='traits-step' in:fade>
	<div class='step-title'>
		<h2>Traits</h2>
	</div>
	<div class='explanation'>
		<p>{TraitExplanation}</p>
	</div>
	<div class='remaining'>
		<h3>Points Remaining: {remaining}</h3>
	</div>
	<div class='trait-list'>
		{#each traits as t}
			<div class='section-card'>
				<div>
					<span class='stat-label'>
						{capitalize(t)}
					</span>
				</div>
				<div class='stat-column'>
					<div class='range-block'>
						<input
							type='range'
							name='{t.toLowerCase()}'
							min=1
							max={traitMax}
							bind:value={$character.traits[t].base}
							on:change|preventDefault={() => {modifyTrait(t)}}
						>
						<div class='range-indicator'>
							{#each Array(traitMax) as _, i}
								<div class='range-number trait-{i+1}'>
									{i+1}
								</div>
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
	.explanation {
		padding: 1rem;
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
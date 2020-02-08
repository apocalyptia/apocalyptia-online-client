<script>
	import { onMount } from 'svelte'
	import { character } from '../../../stores'
	import Capitalize from '../../helpers/Capitalize'
	import RandomRoll from '../../helpers/Random'
	import {
		traitMax,
		TraitExplanation
	} from '../../rules/Traits'
	import Slider from '../ui/creator/Slider.svelte'

	const traits = Object.keys($character.traits)

	const getRemaining = () => {
		return $character.options.startingTraits -
			Object.values($character.traits).reduce(
				(t, { base }) => t += base, 0
			)
	}

	const sumTraits = () => {
		remaining = getRemaining()
	}

	const assignTrait = (t, value) => {
		$character.traits[t].base = parseInt(value)
		checkTrait(t)
	}

	const checkTrait = t => {
		sumTraits()
		while (remaining < 0) {
			$character.traits[t].base--
			sumTraits()
		}
		calculateResults()
	}

	const calculateResults = () => {
		Object.keys($character.traits).forEach(t => {
			$character.setStat('traits', t)
			Object.keys($character.skills).forEach(s => {
				if (
					$character.skills[s].parent == $character.traits[t].name &&
					$character.skills[s].max != $character.traits[t].base
				) {
					$character.skills[s].max = $character.traits[t].base
				}
			})
		})
		$character.updateProperties()
	}

	const resetTraits = () => {
		Object.keys($character.traits).forEach(
			t => $character.traits[t].base = 1
		)
		sumTraits()
	}

	const randomTraits = () => {
		resetTraits()
		while(remaining > 0) {
			let t = RandomRoll(traits)
			if ($character.traits[t].base < traitMax) {
				$character.traits[t].base++
				sumTraits()
			}
		}
		calculateResults()
	}

	let remaining = getRemaining()

	onMount(() => calculateResults())
</script>


<div class='traits-step'>
	<div class='step-title'>
		<h2>Traits</h2>
	</div>
	<div class='explanation'>
		<p>{TraitExplanation($character.options.startingTraits)}</p>
	</div>
	<div class='remaining'>
		<h3>Points Remaining: {remaining}</h3>
	</div>
	<div class='list'>
		{#each traits as t}
			<div class='section-card'>
				<div>
					<span class='stat-label'>
						{Capitalize($character.traits[t].name)}
					</span>
				</div>
				<div class='stat-column'>
					<Slider
						name='{t.toLowerCase()}'
						min={parseInt(1)}
						max={parseInt(traitMax)}
						bind:value={$character.traits[t].base}
						on:input={event => assignTrait(t, event.target.value)}
					/>
				</div>
			</div>
		{/each}
	</div>
	<div class='button-row'>
		<button on:click={resetTraits}>Reset Traits</button>
		<button on:click={randomTraits}>Random Traits</button>
	</div>
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
	.list {
		margin-top: 1rem;
	}
	.remaining,
	.stat-label,
	.button-row {
		text-align: center;
	}
	
</style>
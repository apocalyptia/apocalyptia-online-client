<script>
	import { onMount } from 'svelte'
	import { character } from '../../stores'
	import Capitalize from '../helpers/Capitalize'
	import ToggleVisible from '../helpers/ToggleVisible'
	import RandomRoll from '../helpers/Random'
	import { traitMax } from '../rules/Traits'
	import { 
		startingSkillPoints,
		SkillExplanation
	} from '../rules/Skills'
	import Slider from '../ui/creator/Slider.svelte'


	let skillGroups = Object.keys($character.traits).map(t => {
		return { name: t, visible: false }
	})

	const skills = Object.keys($character.skills)

	const getRemaining = () => {
		return startingSkillPoints($character) -
			Object.values($character.skills).reduce(
				(s, { base }) => s += base, 0
			)
	}

	const sumSkills = () => {
		remaining = getRemaining()
	}

	const assignSkill = (s, value) => {
		$character.skills[s].base = parseInt(value)
		checkSkill(s)
	}

	const checkSkill = s => {
		sumSkills()
		while (remaining < 0 || $character.skills[s].base > $character.skills[s].max) {
			$character.skills[s].base--
			sumSkills()
		}
		calculateResults()
	}

	const calculateResults = () => {
		Object.keys($character.skills).forEach(s => {
			$character.setStat('skills', s)
		})
		$character.updateProperties()
	}

	const resetSkills = () => {
		Object.keys($character.skills).forEach(
			s => $character.skills[s].base = 0
		)
		sumSkills()
	}

	const randomSkills = () => {
		resetSkills()
		while(remaining > 0) {
			let s = Random(skills)
			if ($character.skills[s].base < $character.skills[s].max) {
				$character.skills[s].base++
				sumSkills()
			}
		}
		calculateResults()
	}

	let remaining = getRemaining()

	onMount(() => calculateResults())
</script>

<div class='skills-step'>
	<div class='step-title'>
		<h2>Skills</h2>
	</div>
	<div class='explanation'>
		<p>{SkillExplanation}</p>
	</div>
	<div class='remaining'>
		<h3>Points Remaining: {remaining}</h3>
	</div>
	<div class='list'>
		{#each skillGroups as group}
			<div class='trait-section'>
				<div
					class='parent-trait-title'
					on:click={() => skillGroups = ToggleVisible(group, skillGroups)}
				>
					<h3>{Capitalize($character.traits[group.name].name)} Skills</h3>
				</div>
				{#if group.visible}
					{#each skills as s}
						{#if 
							$character.traits[group.name].name == 
							$character.skills[s].parent
						}
							<br>
							<div class='section-card'>
								<div class='stat-column name-column'>
									<span class='stat-label'>
										{Capitalize($character.skills[s].name)}
									</span>
								</div>
								<div class='stat-column'>
									<Slider
										name='{s.toLowerCase()}'
										min={parseInt(0)}
										max={parseInt(6)}
										bind:value={$character.skills[s].base}
										on:input={event => assignSkill(s, event.target.value)}
									/>
								</div>
							</div>
						{/if}
					{/each}
				{/if}
			</div>
		{/each}
	</div>
	<div class='button-row'>
		<button on:click={resetSkills}>Reset Skills</button>
		<button on:click={randomSkills}>Random Skills</button>
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
		.trait-section {
			text-align: center;
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
	.trait-section {
		border-width: 2px;
		border-style: dotted;
		display: block;
		justify-content: space-between;
		margin: .5rem;
		padding: 1rem;
		align-items: center;
	}
	.parent-trait-title,
	.remaining,
	.stat-label,
	.button-row {
		text-align: center;
	}
</style>
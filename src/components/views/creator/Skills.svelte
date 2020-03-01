<script>
import { onMount } from 'svelte'
import { character } from '../../../stores/characterStore'
import Capitalize from '../../functions/Capitalize'
import ToggleVisible from '../../functions/ToggleVisible'
import RandomRoll from '../../functions/Random'
import { traitMax } from '../../rules/Traits'
import Skills from '../../rules/Skills'
import Slider from '../controls/Slider.svelte'

let skillGroups = Object.keys($character.traits).map(t => {
	return { name: t, visible: false }
})

const skills = Object.keys($character.skills)

const getRemaining = () => {
	return Skills.startingPoints($character) -
		Object.values($character.skills).reduce(
			(s, { base }) => s += base, 0
		)
}

const sumSkills = () => remaining = getRemaining()

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
		let s = RandomRoll(skills)
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


<h1>Skills</h1>
<div class='explanation'>
	<p>{Skills.explanation}</p>
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
					{/if}
				{/each}
			{/if}
		</div>
	{/each}
</div>
<div class='button-row'>
	<button on:click={resetSkills}>
		Reset Skills
	</button>
	<button on:click={randomSkills}>
		Random Skills
	</button>
</div>


<style>
@media only screen and (max-width: 768px) {
	.stat-column {
		width: 100%;
	}
	.trait-section {
		text-align: center;
	}
	.stat-label {
		display: block;
	}
}
.explanation {
	padding: var(--base-unit);
}
.list {
	margin-top: var(--base-unit);
}
.trait-section {
	border-width: var(--smallest-unit);
	border-style: dotted;
	display: block;
	justify-content: space-between;
	margin: var(--half-unit);
	padding: var(--base-unit);
	align-items: center;
}
.parent-trait-title,
.remaining,
.stat-label,
.button-row {
	text-align: center;
}
</style>
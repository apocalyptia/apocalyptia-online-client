<script>
import { beforeUpdate } from 'svelte'
import { character } from '../../stores/characterStore'
import RandomRoll from '../../components/functions/Random'
import Skills from '../../components/rules/Skills'
import Traits from '../../components/rules/Traits'
import Slider from '../../components/views/controls/Slider.svelte'

let remaining = Skills.remaining($character)

const assign = (event) => {
	Skills.assign($character, event.target.name, event.target.value)
	$character = $character
}

const random = () => {
	Skills.random($character)
	$character = $character
}

const reset = () => {
	Skills.reset($character)
	$character = $character
}

beforeUpdate(() => {
	Skills.setScores($character)
	remaining = Skills.remaining($character)
	$character = $character
})
</script>


<h1>Skills</h1>
<div class='explanation'>
	{#each Skills.explanation as line}
		<p>{line}</p>
	{/each}
</div>
<div class='remaining'>
	<h3>Points Remaining: {remaining}</h3>
</div>
<div class='list'>
	{#each Skills.groups as group}
		<details>
			<summary class='parent-trait-title'>
				{group.name} Skills
			</summary>
			<div class='details-content'>
				Max Score: {$character.traits[group.name.toLowerCase()].score}
				{#each group.list as skill}
					<div class='stat-range'>
						<div class='stat-label'>{skill.name}</div>
						<Slider
							name='{skill.name.toLowerCase()}'
							min={parseInt(0)}
							max={parseInt(6)}
							bind:value={
								$character.skills[skill.name.toLowerCase()].base
							}
							on:input={event => assign(event)}
						/>
					</div>
				{/each}
			</div>
		</details>
	{/each}
</div>
<div class='button-row'>
	<button on:click={reset}>
		Reset
	</button>
	<button on:click={random}>
		Random
	</button>
</div>


<style>
details {
	margin-top: var(--double-unit);
	margin-bottom: var(--double-unit);
}
.stat-range {
	margin-top: var(--double-unit);
	margin-bottom: var(--double-unit);
}
.stat-label {
	text-align: center;
	width: 100%;
}
.explanation {
	padding: var(--base-unit);
}
.list {
	margin-top: var(--base-unit);
}
.remaining {
	text-align: center;
}

.button-row {
	display:flex;
	justify-content: space-evenly;
	text-align: center;
	width: 100%;
}
.button-row button {
	width: 20%;
	min-width: 100px;
}
</style>
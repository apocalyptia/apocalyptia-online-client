<script>
import { beforeUpdate } from 'svelte'
import { character } from '../../stores/characterStore'
import RandomRoll from '../../components/functions/Random'
import Skills from '../../components/rules/Skills'
import Traits from '../../components/rules/Traits'
import Slider from '../../components/views/controls/Slider.svelte'
import NavBar from '../../components/views/controls/NavBar.svelte'

let remaining = Skills.remaining($character)

const assign = (event) => $character = Skills.assign($character, event.target)

const random = () => $character = Skills.random($character)

const reset = () => $character = Skills.reset($character)

beforeUpdate(() => {
	$character = Skills.setScores($character)
	remaining = Skills.remaining($character)
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
			<summary>
				<span class='group-label'>
					{group.name} Skills
				</span>
			</summary>
			<div class='details-content'>
				<div class='max-score'>
					Max Score: {$character.traits[group.name.toLowerCase()].score}
				</div>
				{#each group.list as skill}
					<div class='stat-range'>
						<div class='stat-label'>{skill.name}</div>
						<Slider
							name='{skill.name.toLowerCase()}'
							min={parseInt(0)}
							max={parseInt(6)}
							bind:value={$character.skills[skill.name.toLowerCase()].base}
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
<NavBar links={{back: '/creator/traits', next: '/creator/properties'}}/>


<style>
.group-label {
	font-weight: bold;
}
.max-score {
	text-align: center;
}
.stat-range {
	margin: var(--s100);
}
</style>
<script>
	import NavBar from '../../../views/widgets/NavBar.svelte'
	import RandomRoll from '../../../helpers/random/RandomRoll'
	import Skills from '../../../rules/skills/Skills'
	import Slider from '../../../views/widgets/Slider.svelte'
	import Traits from '../../../rules/traits/Traits'
	import { beforeUpdate } from 'svelte'
	import { character } from '../../../stores/characterStore'

	let remaining = Skills.remaining($character)

	let next = `/character/creator/skills`

	const assign = (event) => $character = Skills.assign($character, event.target)

	const random = () => $character = Skills.random($character)

	const reset = () => $character = Skills.reset($character)

	beforeUpdate(() => {
		remaining = Skills.remaining($character)
		if (remaining == 0) next = `/character/creator/properties`
		else next = `/character/creator/skills`
	})
</script>


<svelte:head>
	<title>Apocalyptia Online Character Creator - Skills</title>
</svelte:head>
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
							bind:value={$character.skills[skill.name.toLowerCase()].score}
							on:input={event => assign(event)}
						/>
					</div>
				{/each}
			</div>
		</details>
	{/each}
</div>
<div class='btn-row'>
	<button class='small-cntr-btn' on:click={reset}>
		Reset
	</button>
	<button class='small-cntr-btn' on:click={random}>
		Random
	</button>
</div>
<NavBar links={{back: '/character/creator/traits', next: next}} status={remaining == 0 ? `go` : `stop`}/>


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
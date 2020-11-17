<script>
	import ButtonRow from 'views/character/creator/ButtonRow.svelte'
	import ExplanationBlock from 'views/character/creator/ExplanationBlock.svelte'
	import PointsRemaining from 'views/character/creator/PointsRemaining.svelte'
	import RandomSkills from 'random/RandomSkills.js'
	import Skills from 'rules/Skills.js'
	import SkillsList from 'lists/SkillsList.js'
	import Slider from 'views/widgets/Slider.svelte'
	import { character } from 'stores/characterStore.js'

	$: remaining = Skills.remaining($character)
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Creator - Skills</title>
</svelte:head>
<h1>Skills</h1>
<ExplanationBlock rule={Skills} />
<PointsRemaining points={remaining} />
<div class='section-card'>
	{#each SkillsList.groups as group}
		<div class='item-block'>
			<details class='skills-details'>
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
								on:input={event => $character = Skills.assign($character, event.target)}
							/>
						</div>
					{/each}
				</div>
			</details>
		</div>
	{/each}
</div>
<ButtonRow
	reset={_ => $character = $character.resetSkills()}
	random={_ => $character = RandomSkills($character)}
/>


<style>
	.skills-details {
		margin: var(--std-margin);
	}
	.group-label {
		font-weight: bold;
	}
	.max-score {
		font-weight: bold;
		margin-top: var(--s150);
		margin-left: var(--std-margin);
	}
	.stat-range {
		margin: var(--std-margin);
	}
</style>
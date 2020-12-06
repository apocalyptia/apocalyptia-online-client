<script>
	import ButtonRow from 'views/character/creator/ButtonRow.svelte'
	import ExplanationBlock from 'views/character/creator/ExplanationBlock.svelte'
	import PageHeader from 'views/character/creator/PageHeader.svelte'
	import PointsRemaining from 'views/character/creator/PointsRemaining.svelte'
	import RandomSkills from 'random/RandomSkills.js'
	import Skills from 'rules/Skills.js'
	import SkillsList from 'lists/SkillsList.js'
	import Slider from 'views/widgets/Slider.svelte'
	import { character } from 'stores/characterStore.js'

	$: remaining = Skills.remaining($character)

	export let creator
</script>


<PageHeader {creator} step={$character.meta.step} />
<ExplanationBlock rule={Skills} />
<PointsRemaining points={remaining} />
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
<ButtonRow
	reset={_ => $character = $character.resetSkills()}
	random={_ => $character = RandomSkills($character)}
/>


<style>
	.item-block {
		margin: var(--std-margin) 0;
	}
	.group-label {
		font-weight: bold;
	}
	.max-score {
		font-weight: bold;
		margin-top: var(--std-margin);
		text-align: center;
	}
	.stat-range {
		padding: var(--std-padding);
	}
</style>
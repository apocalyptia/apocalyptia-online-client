<script>
	import Creation from '/src/rules/Creation.js'
	import ExplanationBlock from '/src/components/character/creator/ExplanationBlock.svelte'
	import PageHeader from '/src/components/character/creator/PageHeader.svelte'
	import PointsRemaining from '/src/components/character/creator/PointsRemaining.svelte'
	import RandomSkills from '/src/rules/random/RandomSkills.js'
	import ResetAndRandomButtonRow from '/src/components/buttons/ResetAndRandomButtonRow.svelte'
	import Skills from '/src/rules/Skills.js'
	import SkillsList from '/src/rules/lists/SkillsList.js'
	import Slider from '/src/components/widgets/Slider.svelte'
	import characterStore from '/src/stores/characterStore.js'

	$: remaining = Skills.remaining($characterStore)

	const updateSkill = (event) => {
		$characterStore = Skills.assign($characterStore, event.target)
		Creation.proceedCheck($characterStore)
	}
</script>


<div class='skills-step-page'>
	<PageHeader chapter={'Skills'} step={$characterStore.meta.step} />
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
							Max Score: {$characterStore.traits[group.name.toLowerCase()].score}
						</div>
						{#each group.list as skill}
							<div class='stat-range'>
								<div class='stat-label'>{skill.name}</div>
								<Slider
									name='{skill.name.toLowerCase()}'
									min={parseInt(0)}
									max={parseInt(6)}
									bind:value={$characterStore.skills[skill.name.toLowerCase()].score}
									on:input={event => updateSkill(event)}
									indicator=true
								/>
							</div>
						{/each}
					</div>
				</details>
			</div>
		{/each}
	<ResetAndRandomButtonRow
		reset={_ => $characterStore = $characterStore.resetSkills($characterStore)}
		random={_ => $characterStore = RandomSkills($characterStore)}
	/>
</div>


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
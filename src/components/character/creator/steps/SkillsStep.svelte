<script>
	import Creation from '/src/rules/Creation.js'
	import ExplanationBlock from '/src/components/character/creator/ExplanationBlock.svelte'
	import PageHeader from '/src/components/character/creator/PageHeader.svelte'
	import PointsRemaining from '/src/components/character/creator/PointsRemaining.svelte'
	import ResetAndRandomButtonRow from '/src/components/buttons/ResetAndRandomButtonRow.svelte'
	import Slider from '/src/components/widgets/Slider.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import { onMount } from 'svelte'

	const skillGroups = Object.values($characterStore.traits).map((t) => {
		return {
			name: t.name,
			list: Object.values($characterStore.skills).filter((s) => s.parent === t.name),
			max: t.score
		}
	})

	function randomSkills() {
		$characterStore.randomSkills()
		$characterStore = $characterStore
	}

	function resetSkills() {
		$characterStore.resetSkills()
		$characterStore = $characterStore
	}

	function updateSkill(skill) {
		$characterStore.updateSkill(skill)
		$characterStore = $characterStore
	}

	onMount(() => {
		$characterStore.remainingSkills()
		$characterStore = $characterStore
	})
</script>

<div class="skills-step-page">
	<fieldset>
		<PageHeader chapter={'Skills'} step={$characterStore.step} />
		<ExplanationBlock rule={Creation.skills.desc} />
		<PointsRemaining points={$characterStore.skillsRemaining} />
		{#each skillGroups as group}
			<div class="item-block">
				<details class="skills-details">
					<summary>
						<h2>{group.name} Skills</h2>
					</summary>
					<div class="details-content">
						<div class="max-score">
							Max Score: {group.max}
						</div>
						{#each group.list as skill}
							<div class="stat-range">
								<h3>{skill.name}</h3>
								<Slider
									name={skill.name}
									type={'skill'}
									min="0"
									max={$characterStore.maxTraits}
									bind:value={$characterStore.skills[skill.name.toLowerCase()].score}
									func={() => updateSkill(skill)}
									indicator="true"
								/>
							</div>
						{/each}
					</div>
				</details>
			</div>
		{/each}
		<ResetAndRandomButtonRow reset={() => resetSkills()} random={() => randomSkills()} />
	</fieldset>
</div>

<style>
	.item-block {
		margin: var(--std-margin) 0;
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

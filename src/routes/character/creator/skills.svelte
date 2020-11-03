<script>
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
<div class='creator-page'>
	<h1>Skills</h1>
	<div class='explanation'>
		{#each Skills.text as line}
			<p>{line}</p>
		{/each}
	</div>
	<div class='remaining'>
		<h3>Points Remaining: {remaining}</h3>
	</div>
	<div class='list'>
		{#each SkillsList.groups as group}
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
		{/each}
	</div>
	<div class='btn-row'>
		<button class='small-cntr-btn' on:click={() => $character = $character.resetSkills()}>
			Reset
		</button>
		<button class='small-cntr-btn' on:click={() => $character = RandomSkills($character)}>
			Random
		</button>
	</div>
</div>


<style>
	.skills-details {
		margin-bottom: var(--s100);
	}
	.group-label {
		font-weight: bold;
	}
	.max-score {
		font-weight: bold;
		margin-top: var(--s150);
		text-align: center;
	}
	.stat-range {
		margin: var(--s100);
	}
</style>
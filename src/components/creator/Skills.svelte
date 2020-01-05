<script>
	import { fade } from 'svelte/transition'
	import { HideShow } from '../../helpers/HideShow'
	import { character } from '../../stores'

	const skills = Object.keys($character.skills)

	let skillGroups = []
	Object.keys($character.traits).forEach((trait) => {
		skillGroups.push({
			name: trait, visible: false
		})
	})
	let skillPoints = $character.traits.brains.base * 3
	let remaining = skillPoints

	const countSkillPoints = (event) => {
		let target = event.target
		let skillCount = 0
		skills.forEach((skill) => { skillCount += $character.skills[skill].base })
		remaining = skillPoints - skillCount
		if (remaining < 0 || target.value > $character.skills[target.name].max) {
			$character.skills[target.name].base -= 1
			target.value -= 1
			countSkillPoints(event)
		}
		$character.updateProps()
	}

</script>

<div class='skills-step' in:fade>
	<div class='step-title'>
		<h2>Skills</h2>
	</div>
	<div class='remaining'>
		<h3>Points Remaining: {remaining}</h3>
	</div>
	<div class='skill-list'>
		{#each skillGroups as group}
			<div class='trait-section'>
				<div class='parent-trait-title' on:click={() => skillGroups = HideShow(group, skillGroups)}>
					<h3>{$character.traits[group.name].name} Skills</h3>
				</div>
				{#if group.visible}
					{#each skills as skill}
						{#if $character.traits[group.name].name == $character.skills[skill].parent}
							<br>
							<div class='skill-block'>
								<div class='stat-column name-column'>
									<span class='stat-label'>{$character.skills[skill].name}</span>
								</div>
								<div class='stat-column value-column'>
									<div class='stat-input'>
										<input
											class='slider-input'
											type='range'
											name='{$character.skills[skill].name.toLowerCase()}'
											min=0
											max=6
											bind:value={$character.skills[skill].base}
											invalid={remaining < 0}
											on:input|preventDefault={(event) => countSkillPoints(event)}
										>
									</div>
									<div class='stat-input'>
										<div>0</div>
										<div>1</div>
										<div>2</div>
										<div>3</div>
										<div>4</div>
										<div>5</div>
										<div>6</div>
									</div>
								</div>
							</div>
						{/if}
					{/each}
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	@media only screen and (max-width: 500px) {
		.skill-block {
			display: block;
			width: 100%;
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
			width: 100%;
		}
	}
	.skill-list {
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
	.stat-column, 
	.stat-input {
		text-align: center;
	}
	.stat-input {
		display: flex;
		flex-wrap: nowrap;
	}
	.stat-input div {
		text-align: center;
		min-width: calc(100%/7);
	}
</style>
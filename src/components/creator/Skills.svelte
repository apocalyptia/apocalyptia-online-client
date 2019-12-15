<script>
	import HideShow from '../../layout/HideShow'
	import { CharacterStore } from '../../rules/Stores'
	let char
	const unsubscribe = CharacterStore.subscribe(value => { char = value })

	const skills = Object.keys(char.skills)

	let skillGroups = []
	Object.keys(char.traits).forEach((trait) => {
		skillGroups.push({
			name: trait, visible: false
		})
	})
	let skillPoints = char.traits.brains.score * 3
	let remaining = skillPoints

	function countSkillPoints(event) {
		let target = event.target
		let skillCount = 0
		skills.forEach((skill) => { skillCount += char.skills[skill].score })
		remaining = skillPoints - skillCount
		if (remaining < 0 || target.value > char.skills[target.name].max) {
			char.skills[target.name].score -= 1
			target.value -= 1
			countSkillPoints(event)
		}
		char.updateProps()
	}

</script>

<div class='step'>
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
					<h3>{char.traits[group.name].name} Skills</h3>
				</div>
				{#if group.visible}
					{#each skills as skill}
						{#if char.traits[group.name].name == char.skills[skill].parent}
							<div class='stat-block'>
								<div class='stat-column name-column'>
									<span class='stat-label'>{char.skills[skill].name}</span>
								</div>
								<div class='stat-column value-column'>
									<div class='stat-input'>
										<input
											class='slider-input'
											type='range'
											name='{char.skills[skill].name.toLowerCase()}'
											min=0
											max=6
											bind:value={char.skills[skill].score}
											invalid={(remaining < 0) || this.value > char.traits[group.name].score}
											on:input|preventDefault={(event) => countSkillPoints(event)}
										>
									</div>
									<div class='stat-input'>
										<span>0</span>
										<span>1</span>
										<span>2</span>
										<span>3</span>
										<span>4</span>
										<span>5</span>
										<span>6</span>
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
		.stat-block {
			display: block;
		}
		.stat-column {
			width: 100%;
		}
	}
	@media only screen and (min-width: 500px) {
		.stat-column {
			width: 50%;
		}
	}
	.skill-list {
		margin-top: 25px;
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
	.stat-input span {
		display: inline-block;
		text-align: center;
		width: 12%;
	}
	.step {
		margin-bottom: 75px;
	}
</style>
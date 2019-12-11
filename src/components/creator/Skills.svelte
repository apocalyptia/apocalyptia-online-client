<script>
	import { CharacterStore } from '../../rules/Stores'
	let char
	const unsubscribe = CharacterStore.subscribe(value => { char = value })

	const traits = Object.keys(char.traits)
	const skills = Object.keys(char.skills)

	let startingSkillPoints = char.traits.brains.score * 3
	let remaining = startingSkillPoints

	function countSkillPoints(event) {
		// TODO: Fix infinite loop race condition in recursion logic
		let skillCount = 0
		skills.forEach((skill) => { skillCount += char.skills[skill].score })
		remaining = startingSkillPoints - skillCount
		if (remaining < 0) {
			char.skills[event.target.name].score = 1
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
	{#each traits as trait}
		<div class='skill-section'>
			<div class='parent-trait-title'>
				<h3>{char.traits[trait].name} Skills</h3>
			</div>
			{#each skills as skill}
				{#if char.traits[trait].name == char.skills[skill].parent}
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
									invalid={(remaining < 0) || this.value > char.traits[trait].score}
									on:input|preventDefault={(event) => countSkillPoints(event)}
								>
							</div>
							<div class='stat-input'>
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
		</div>
	{/each}
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
	.skill-section{
		border: 1px dashed var(--char-color);
		margin: 20px 5px 20px 5px;
		padding: 0 10px 10px 10px;
	}
	.parent-trait-title {
		margin-bottom: 10px;
		text-align: center;
	}
	.remaining {
		text-align: center;
	}
	.stat-label {
		text-align: center;
	}
	.stat-column {
		text-align: center;
	}
	.stat-input {
		text-align: center;
	}
	.stat-input span {
		display: inline-block;
		text-align: center;
		width: 14%;
	}
</style>
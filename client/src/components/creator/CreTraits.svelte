<script>
	import capitalize from '../../functions/Capitalize'
	import { CharacterStore } from '../../stores'
	let char
	const unsubscribe = CharacterStore.subscribe(value => { char = value })

	const traits = Object.keys(char.traits)

	const traitPoints = 12
	let remaining = traitPoints - traits.length

	function countTraitPoints(event) {
		let target = event.target
		let traitCount = 0
		traits.forEach((trait) => { traitCount += char.traits[trait].score })
		remaining = traitPoints - traitCount
		if (remaining < 0) {
			char.traits[target.name].score -= 1
			target.value -= 1
			countTraitPoints(event)
		}
		setSkillMax()
		char.updateProps()
	}

	function setSkillMax() {
		traits.forEach((trait) => {
			Object.keys(char.skills).forEach((skill) => {
				if (char.skills[skill].parent === capitalize(trait)) {
					char.skills[skill].max = char.traits[trait].score
				}
			})
		})
	}
</script>

<div class='step'>
	<div class='step-title'>
		<h2>Traits</h2>
	</div>
	<div class='remaining'>
		<h3>Points Remaining: {remaining}</h3>
	</div>
	{#each traits as trait}
		<div class='stat-block'>
			<div class='stat-column name-column'>
				<span class='stat-label'>{char.traits[trait].name}</span>
			</div>
			<div class='stat-column value-column'>
				<div class='stat-input'>
					<input
						class='slider-input'
						type='range'
						name='{char.traits[trait].name.toLowerCase()}'
						min=1
						max=6
						bind:value={char.traits[trait].score}
						invalid={remaining < 0}
						on:input|preventDefault={(event) => countTraitPoints(event)}
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
	.remaining,
	.stat-label,
	.stat-column,
	.stat-input {
		text-align: center;
	}
	.stat-input span {
		display: inline-block;
		text-align: center;
		width: 14%;
	}
</style>
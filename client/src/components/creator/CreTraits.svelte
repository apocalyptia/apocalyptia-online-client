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
					<div>1</div>
					<div>2</div>
					<div>3</div>
					<div>4</div>
					<div>5</div>
					<div>6</div>
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
	.slider-input {
		width: 100%;
	}
	.stat-input {
		display: flex;
		flex-wrap: nowrap;
	}
	.stat-input div {
		text-align: center;
		width: calc(100%/6);
	}
</style>
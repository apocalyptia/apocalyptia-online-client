<script>
	import { fade } from 'svelte/transition'
	import { capitalize } from '../../functions/Capitalize'
	import { character } from '../../stores'

	const traits = Object.keys($character.traits)

	const traitPoints = 12
	let remaining = traitPoints - traits.length

	const countTraitPoints = (event) => {
		let target = event.target
		let traitCount = 0
		traits.forEach((trait) => { traitCount += $character.traits[trait].base })
		remaining = traitPoints - traitCount
		if (remaining < 0) {
			$character.traits[target.name].base -= 1
			target.value -= 1
			countTraitPoints(event)
		}
		setSkillMax()
		$character.updateProps()
	}

	const setSkillMax = () => {
		traits.forEach((trait) => {
			Object.keys($character.skills).forEach((skill) => {
				if ($character.skills[skill].parent === capitalize(trait)) {
					$character.skills[skill].max = $character.traits[trait].base
				}
			})
		})
	}
</script>

<div class='traits-step' in:fade>
	<div class='step-title'>
		<h2>Traits</h2>
	</div>
	<div class='remaining'>
		<h3>Points Remaining: {remaining}</h3>
	</div>
	{#each traits as trait}
		<div class='stat-block'>
			<div class='stat-column name-column'>
				<span class='stat-label'>{$character.traits[trait].name}</span>
			</div>
			<div class='stat-column value-column'>
				<div class='stat-input'>
					<input
						class='slider-input'
						type='range'
						name='{$character.traits[trait].name.toLowerCase()}'
						min=1
						max=6
						bind:value={$character.traits[trait].base}
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
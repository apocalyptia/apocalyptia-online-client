<script>
	import { CharacterStore } from '../../rules/Stores'
	let char
	const unsubscribe = CharacterStore.subscribe(value => { char = value })

	const traits = Object.keys(char.traits)

	const traitPoints = 12
	let remaining = traitPoints - traits.length

	function countTraitPoints(event) {
		let traitCount = 0
		traits.forEach((trait) => { traitCount += char.traits[trait].score })
		remaining = traitPoints - traitCount
		if (remaining < 0) {
			char.traits[event.target.name].score = 1
			countTraitPoints(event)
		}
		char.updateProps()
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
						class='stat-input'
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
	.remaining {
		text-align: center;
	}
	.stat-label {
		text-align: center;
	}
	.stat-column {
		text-align: center;
	}
	.remaining {
		margin-left: 2rem;
	}
	.stat-input {
		text-align: center;
	}
	.stat-input span {
		display: inline-block;
		text-align: center;
		width: 14%;
	}
	input[type=range] {
		color: transparent;
		-webkit-appearance: none;
		width: 90%;
	}
	input[type=range]::-webkit-slider-thumb {
		-webkit-appearance: none;
	}
	input[type=range]::focus {
		outline: none;
	}
	input[type=range]::-ms-track {
		background: transparent;
		border-color: transparent;
		color: transparent;
	}
	input[type=range]::-moz-range-thumb {
		border: 1px solid rgb(15, 30, 15);
		height: 30px;
		width: 30px;
		border-radius: 5px;
		background: lime;
	}
	input[type=range]::-webkit-slider-thumb {
		-webkit-appearance: none;
		border: 1px solid rgb(15, 30, 15);
		height: 30px;
		width: 30px;
		border-radius: 5px;
		background: lime;
		margin-top: 0px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
	}
</style>
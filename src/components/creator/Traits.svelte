<script>
	import { CharacterStore } from '../../rules/Stores'
	let char
	const unsubscribe = CharacterStore.subscribe(value => { char = value })

	const traits = Object.keys(char.traits)

	const traitPoints = 12
	let remaining = traitPoints - traits.length

	function countTraitPoints() {
		let traitCount = 0
		traits.forEach((trait) => { traitCount += char.traits[trait].score })
		remaining = traitPoints - traitCount
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
			<div class='stat-column-left'>
				<span class='stat-label'>{char.traits[trait].name}</span>
				<span>{char.traits[trait].score}</span>
			</div>
			<div class='stat-column'>
				<div class='stat-input'>
					<input
						class='stat-input'
						type='range'
						name='{char.traits[trait].name}Score'
						min='1'
						max={Math.min(char.traits[trait].max, (char.traits[trait].score + remaining))}
						on:input={countTraitPoints}
						bind:value={char.traits[trait].score}
					>
				</div>
				<div class='stat-input'>
					<span>1 &nbsp 2 &nbsp 3 &nbsp 4 &nbsp 5 &nbsp 6</span>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	@media only screen and (max-width: 600px) {
		.stat-block {
			display: block;
		}
	}
	.stat-block {
		margin: auto;
	}
	.remaining {
		margin-left: 2rem;
	}
	.stat-column {
		text-align: center;
		width: 33.3%;
	}
	.stat-input {
		width: 210px;
	}
</style>
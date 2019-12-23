<script>
	import { AbilityList } from '../rules//Abilities'
	import { CharacterStore } from '../../stores'
	let char
	const unsubscribe = CharacterStore.subscribe(value => { char = value })

	let remaining = char.props.xp.score

	function modifyAbilities() {
		remaining = char.props.xp.score
		char.abilities = []
		AbilityList.forEach(function (ability) {
			if (ability.taken > 0) {
				char.abilities.push(ability)
				for (let t = 0; t < ability.taken; t++) {
					remaining -= ability.xp
				}
			}
			switch (ability.name) {
				case `Specialize`:
					break
				case `Fleet Footed`:
					char.props.speed.score += 1
				case `Danger Sense`:
					char.props.reflex.score += 1
			}
		})
	}
</script>

<div class='abilities-step'>
	<div class='step-title'>
		<h2>Abilities</h2>
	</div>
	<div class='remaining'>
		<h3>XP Remaining: {remaining}</h3>
	</div>
	<div class='stat-block'>
		<div class='abilities-list'>
			<div class='header-row'>
				<div class='m-col name-header'>Name</div>
				<div class='l-col description-header'>Description</div>
				<div class='s-col max-header'>Max</div>
				<div class='s-col xp-header'>XP</div>
				<div class='s-col taken-header'>Taken</div>
			</div>
			{#each AbilityList as ability, index}
				<br>
				{#if AbilityList[index-1] != undefined && AbilityList[index].xp != AbilityList[index-1].xp}
					<div class='separator'></div>
					<br>
				{/if}
				<div class='ability-row'>
					<div class='m-col'>
						<span class='ability-name'>{ability.name}</span>
					</div>
					<div class='l-col'>
						<span class='description-label'>Descripiton: </span>
						<span class='ability-description'>{ability.description}</span>
					</div>
					<div class='s-col'>
						<span class='max-label'>Max: </span>
						<span class='ability-max'>{ability.max}</span>
					</div>
					<div class='s-col'>
						<span class='xp-label'>XP: </span>
						<span class='ability-xp'>{ability.xp}</span>
					</div>
					<div class='s-col'>
						<span class='taken-label'>Taken: </span>
						<span class='ability-taken'>
							<input
								type='number'
								class='taken-number'
								min=0
								max={ability.max}
								bind:value={ability.taken}
								on:input={modifyAbilities}
							>
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	@media only screen and (max-width: 500px) {
		.header-row {
			display: none;
		}
		.l-col, .m-col, .s-col {
			display: block;
		}
		.ability-name,
		.description-label,
		.max-label,
		.xp-label,
		.taken-label {
			font-weight: bold;
		}
		.ability-name {
			text-decoration: underline;
		}
	}
	@media only screen and (min-width: 500px) {
		.name-header,
		.description-header,
		.max-header,
		.xp-header,
		.taken-header {
			text-decoration: underline;
		}
		.description-label,
		.max-label,
		.xp-label,
		.taken-label {
			display: none;
		}
		.l-col, .m-col, .s-col {
			display: inline-block;
		}
		.l-col {
			width: 46%;
		}
		.m-col {
			width: 20%;
		}
		.s-col {
			text-align: center;
			width: 8%;
		}
	}
	.abilities-step {
		margin-bottom: 5vh;
		text-align: left;
	}
	.abilities-list {
		width: 100%;
	}
	.remaining {
		text-align: center;
	}
	.separator {
		border-bottom: 1px solid;
		margin-bottom: 10px;
		padding-bottom: 10px;
		width: 100%;
	}
</style>
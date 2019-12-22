<script>
	import { AbilityList } from '../rules//Abilities'
	import { CharacterStore } from '../../stores'
	let char
	const unsubscribe = CharacterStore.subscribe(value => { char = value })

	function modifyAbilities() {
		char.abilities = []
		AbilityList.forEach(function (ability) {
			if (ability.taken > 0) {
				char.abilities.push(ability)
			}
		})
	}
</script>

<div class='step'>
	<div class='step-title'>
		<h2>Abilities</h2>
	</div>
	<div class='stat-block'>
		<div class='abilities-table'>
			<div class='ability-row header-row separator'>
				<div class='m-col'>Name</div>
				<div class='l-col'>Description</div>
				<div class='s-col'>Max</div>
				<div class='s-col'>XP</div>
				<div class='s-col'>Taken</div>
			</div>
			{#each AbilityList as ability, index}
				{#if AbilityList[index-1] != undefined && AbilityList[index].xp != AbilityList[index-1].xp}
					<div class='separator'></div>
				{/if}
				<div class='ability-row'>
					<div class='m-col'>{ability.name}</div>
					<div class='l-col'>{ability.description}</div>
					<div class='s-col'>{ability.max}</div>
					<div class='s-col'>{ability.xp}</div>
					<div class='s-col'>
						<input
							type='number'
							class='taken-number'
							min=0
							max={ability.max}
							bind:value={ability.taken}
							on:input={modifyAbilities}
						>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	@media only screen and (max-width: 500px) {
		.m-col {
			text-decoration: underline;
		}
		.m-col, .l-col {
			display: block;
			/* width: 100%; */
		}
	}
	@media only screen and (min-width: 500px) {
		.m-col {
			text-decoration: underline;
		}
		.m-col, .l-col {
			display: inline-block;
			/* width: 10%; */
		}
	}
	/* .abilities-table {
		width: 100%;
	} */
	/* .ability-row {
		width: inherit;
	} */
	.header-row {
		font-size: 1.25em;
	}
	.s-col {
		display: inline-block;
		text-align: center;
		/* width: 10%; */
	}
	.separator {
		border-bottom: 1px solid;
		margin-bottom: 10px;
		padding-bottom: 10px;
	}
</style>
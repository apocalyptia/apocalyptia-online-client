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

<div class='abilities-step'>
	<div class='step-title'>
		<h2>Abilities</h2>
	</div>
	<div class='stat-block'>
		<div class='abilities-list'>
			{#each AbilityList as ability, index}
				<br>
				{#if AbilityList[index-1] != undefined && AbilityList[index].xp != AbilityList[index-1].xp}
					<div class='separator'></div>
					<br>
				{/if}
				<div class='ability-row'>
					<div class='m-col'>
						<span class='name-label'>Name: </span>
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
	.abilities-step {
		margin-bottom: 5vh;
		text-align: left;
	}
	.abilities-list {
		width: 100%;
	}
	.ability-name {
		text-decoration: underline;
	}
	.l-col, .m-col, .s-col {
		display: block;
	}
</style>
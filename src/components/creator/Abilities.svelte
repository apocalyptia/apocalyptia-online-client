<script>
	import { beforeUpdate } from 'svelte'
	import { character } from '../../stores'
	import ToggleVisible from '../helpers/ToggleVisible'
	import Abilities, {
		AbilitiesExplanation,
		AbilityGroups
	} from '../rules/Abilities'
	import AbilityGroup from '../ui/creator/AbilityGroup.svelte'
	import AbilityCard from '../ui/creator/AbilityCard.svelte'
	import AbilityCurrent from '../ui/creator/AbilityCurrent.svelte'


	let spentXP = 0

	const getRemaining = () => $character.properties.experience.score - spentXP

	let remaining = getRemaining()

	let MasterAbilityList = Abilities

	const resetAbilities = () => {
		for (let a = 0; a < $character.abilities.length; ++a) {
			$character.abilities[a].taken = 0
		}
	}

	beforeUpdate(() => {
		$character.abilities = MasterAbilityList.filter(ability => ability.taken)
	})
</script>

<div class='abilities-step'>
	<div class='step-title'><h2>Abilities</h2></div>
	<div class='explanation'><p>{AbilitiesExplanation}</p></div>
	<div class='remaining'><h3>Starting XP Remaining: {remaining}</h3></div>
	{#if $character.abilities.length}
		<div class='section-card'>
			<AbilityCurrent {MasterAbilityList}/>
		</div>
	{/if}
	<div class='section-card'>
		<div class='abilities-list'>
			{#each AbilityGroups as group, index}
				<div class='ability-group'>
					<AbilityGroup {group} {MasterAbilityList}/>
				</div>
			{/each}
		</div>
	</div>
	<div class='button-row'>
		<button on:click={resetAbilities}>Reset Abilities</button>
	</div>
</div>

<style>
	.ability-group {
		margin: 1rem;
	}
	.explanation {
		padding: 1rem;
	}
	.abilities-step {
		text-align: left;
	}
	.abilities-list {
		width: 100%;
	}
	.remaining,
	.button-row {
		text-align: center;
	}
</style>
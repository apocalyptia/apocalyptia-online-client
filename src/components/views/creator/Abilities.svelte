<script>
import { beforeUpdate } from 'svelte'
import { character } from '../../../stores'
import ToggleVisible from '../../helpers/ToggleVisible'
import { AbilitiesList, AbilitiesExplanation, AbilityGroups } from '../../rules/Abilities'
import AbilityGroup from './ui/AbilityGroup.svelte'
import AbilityCard from './ui/AbilityCard.svelte'
import AbilityCurrent from './ui/AbilityCurrent.svelte'

let remaining = $character.remainingXP()

let MasterAbilityList = AbilitiesList

const resetAbilities = () => {
	for (let a = 0; a < $character.abilities.length; ++a) {
		$character.abilities[a].taken = 0
	}
}

beforeUpdate(() => {
	$character.abilities = MasterAbilityList.filter(ability => ability.taken)
	remaining = $character.remainingXP()
})
</script>


<div class='abilities-step'>
	<h1>Abilities</h1>
	<div class='explanation'>
		<p>{AbilitiesExplanation}</p>
	</div>
	<div class='remaining'>
		<h3>Starting XP Remaining: {remaining}</h3>
	</div>
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
	margin: var(--base-unit);
}
.explanation {
	padding: var(--base-unit);
}
.abilities-list {
	width: 100%;
}
.remaining,
.button-row {
	text-align: center;
}
</style>
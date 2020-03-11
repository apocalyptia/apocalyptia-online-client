<script>
import { beforeUpdate } from 'svelte'
import { character } from '../../stores/characterStore'
import ToggleVisible from '../../components/functions/ToggleVisible'
import Abilities from '../../components/rules/Abilities'
import AbilityGroup from '../../components/views/creator/AbilityGroup.svelte'
import AbilityCard from '../../components/views/creator/AbilityCard.svelte'
import AbilityCurrent from '../../components/views/creator/AbilityCurrent.svelte'
import NavBar from '../../components/views/controls/NavBar.svelte'

let remaining = Abilities.remainingXP($character)

let MasterAbilityList = Abilities.masterList

const resetAbilities = () => {
	for (let a = 0; a < $character.abilities.length; ++a) {
		$character.abilities[a].taken = 0
	}
	remaining = Abilities.remainingXP($character)
}

beforeUpdate(() => {
	$character.abilities = MasterAbilityList.filter(ability => ability.taken)
	remaining = Abilities.remainingXP($character)
	$character = $character
})
</script>


<div class='abilities-step'>
	<h1>Abilities</h1>
	<div class='explanation'>
		{#each Abilities.explanation as line}
			<p>{line}</p>
		{/each}
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
			{#each Abilities.groups as group, index}
				<div class='ability-group'>
					<AbilityGroup {group} {MasterAbilityList}/>
				</div>
			{/each}
		</div>
	</div>
	<div class='button-row'>
		<button on:click={resetAbilities}>Reset</button>
	</div>
</div>
<NavBar links={{back: '/creator/properties', next: '/creator/gear'}}/>


<style>
.ability-group {
	margin: var(--s100);
}
.abilities-list {
	width: 100%;
}
</style>
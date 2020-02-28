<script>
import { character } from '../../../../stores/characterStore'
import Capitalize from '../../../functions/Capitalize'
import ToggleVisible from '../../../functions/ToggleVisible'
import AbilityModal from './AbilityModal.svelte'

export let ability
export let MasterAbilityList
</script>


<div class='ability-card' 
	on:click={() => MasterAbilityList = ToggleVisible(ability, MasterAbilityList)}>
	<div class='card-row'>
		<span class='ability-name'>{ability.name}</span>
	</div>
	<div class='card-row'>
		<span class='ability-description'>{ability.description}</span>
	</div>
</div>
{#if ability.visible == true}
	<AbilityModal
		on:close='{() => MasterAbilityList = ToggleVisible(ability, MasterAbilityList)}'
		{ability}
		{MasterAbilityList}
	/>
{/if}


<style>
.ability-card {
	margin: var(--base-unit) auto;
}
.card-row {
	display: flex;
	justify-content: space-between;
	margin: var(--half-unit) auto;
}
.ability-name{
	flex: 2;
	font-weight: bold;
	text-decoration: underline;
	text-align: center;
}
</style>
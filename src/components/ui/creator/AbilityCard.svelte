<script>
	import { character } from '../../../stores'
	import Capitalize from '../../helpers/Capitalize'
	import ToggleVisible from '../../helpers/ToggleVisible'
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
		margin: 1rem auto;
	}
	.card-row {
		display: flex;
		justify-content: space-between;
		margin: .5rem auto;
	}
	.ability-name{
		flex: 2;
		font-weight: bold;
		text-decoration: underline;
		text-align: center;
	}
</style>
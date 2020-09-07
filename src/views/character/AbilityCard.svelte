<script>
	import AbilityModal from './AbilityModal.svelte'
	import ToggleVisible from '../../helpers/utils/ToggleVisible'
	import { character } from '../../stores/characterStore'

	export let ability, MasterAbilityList
</script>


<div class='ability-card' on:click={() => MasterAbilityList = ToggleVisible(ability, MasterAbilityList)}>
	<div class='card-row'>
		<span class='ability-name'>{ability.name}</span>
	</div>
	<div class='card-row'>
		<span class='ability-description'>{ability.desc}</span>
	</div>
</div>
{#if ability.visible == true}
	<AbilityModal on:close='{() => MasterAbilityList = ToggleVisible(ability, MasterAbilityList)}'
		{ability}
		{MasterAbilityList}
	/>
{/if}


<style>
	.ability-card {
		border: var(--s1) solid;
		margin: var(--s100);
		padding: var(--s100);
	}
	.ability-card:hover {
		background-color: lime;
		color: rgba(15, 30, 15, 1);
		cursor: pointer;
	}
	.card-row {
		display: flex;
		justify-content: space-between;
		margin: var(--s50) auto;
	}
	.ability-name{
		flex: 2;
		font-weight: bold;
		text-decoration: underline;
		text-align: center;
	}
</style>
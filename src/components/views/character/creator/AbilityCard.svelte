<script>
	import AbilityModal from 'views/character/creator/AbilityModal.svelte'
	import ToggleVisible from 'utils/ToggleVisible.js'

	export let ability, MasterAbilityList
</script>


<div class='ability-card' on:click={_ => MasterAbilityList = ToggleVisible(ability, MasterAbilityList)}>
	<div class='card-row'>
		<span class='ability-name'>{ability.name}</span>
	</div>
	<div class='card-row'>
		<span class='ability-description'>{ability.desc}</span>
	</div>
</div>
{#if ability.visible == true}
	<AbilityModal on:close='{_ => MasterAbilityList = ToggleVisible(ability, MasterAbilityList)}'
		{ability}
		{MasterAbilityList}
	/>
{/if}


<style>
	.ability-card {
		border: 1px solid;
		margin: var(--std-margin);
	}
	.ability-card:hover {
		background-color: var(--pri-color-trans);
		color: var(--sec-color);
		cursor: pointer;
		font-weight: bold;
	}
	.card-row {
		display: flex;
		justify-content: space-between;
		margin: var(--std-margin);
	}
	.ability-name{
		flex: 2;
		font-weight: bold;
		text-decoration: underline;
		text-align: center;
	}
	.ability-description {
		line-height: 1.5;
	}
</style>
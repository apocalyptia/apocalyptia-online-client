<script>
	import AbilityModal from 'components/character/creator/AbilityModal.svelte'
	import ToggleVisible from 'utils/ui/ToggleVisible.js'

	export let ability, MasterAbilityList
</script>


<button class='ability-card' on:click={_ => MasterAbilityList = ToggleVisible(ability, MasterAbilityList)}>
	<div class='ability-name'>
		{ability.name}
	</div>
	<div class='ability-description'>
		{ability.desc}
	</div>
</button>
{#if ability.visible == true}
	<AbilityModal on:close='{_ => MasterAbilityList = ToggleVisible(ability, MasterAbilityList)}'
		{ability}
		{MasterAbilityList}
	/>
{/if}


<style>
	.ability-card {
		animation: none;
		border: 1px solid;
		height: fit-content;
		margin: var(--std-margin);
		position: relative;
		width: calc(100% - (var(--std-margin) * 2));
		z-index: 0;
	}
	.ability-name{
		flex: 2;
		font-weight: bold;
		padding: var(--std-padding);
		text-decoration: underline;
		text-align: center;
	}
	.ability-description {
		line-height: 1.5;
		margin: var(--std-margin);
	}
</style>
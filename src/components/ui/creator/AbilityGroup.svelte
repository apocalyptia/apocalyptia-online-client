<script>
	import ToggleVisible from '../../helpers/ToggleVisible'
	import AbilityCard from './AbilityCard.svelte'

	export let group
	export let MasterAbilityList
</script>

<div class='xp-group-section'>
	<div
		class='xp-group-title'
		on:click={() => group = ToggleVisible(group, group)}
	>
		{group.name}XP Abilities
	</div>
	{#if group.visible}
		{#each group.list as ability}
			<div class='ability-card'>
				<AbilityCard {ability} {MasterAbilityList}/>
			</div>
		{/each}
	{/if}
</div>

<style>
	.xp-group-section {
		border: 1px solid;
		padding: 1rem;
	}
	.xp-group-title {
		font-size: 1.25rem;
		text-align: center;
	}
	.ability-card {
		margin: 1rem;
		padding: .5rem;
		border: 1px solid;
	}
</style>
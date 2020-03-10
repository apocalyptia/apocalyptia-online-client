<script>
import ToggleVisible from '../../functions/ToggleVisible'
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
	border: var(--s1) solid;
	padding: var(--s100);
}
.xp-group-title {
	font-size: var(--s125);
	text-align: center;
}
.ability-card {
	margin: var(--s100);
	padding: var(--s50);
	border: var(--s1) solid;
}
</style>
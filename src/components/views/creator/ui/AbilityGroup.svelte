<script>
import ToggleVisible from '../../../helpers/ToggleVisible'
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
	border: var(--smallest-unit) solid;
	padding: var(--base-unit);
}
.xp-group-title {
	font-size: calc(var(--base-unit) * 1.25);
	text-align: center;
}
.ability-card {
	margin: var(--base-unit);
	padding: var(--half-unit);
	border: var(--smallest-unit) solid;
}
</style>
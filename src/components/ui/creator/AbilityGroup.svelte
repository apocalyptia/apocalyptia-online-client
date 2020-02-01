<script>
	import { ToggleVisible } from '../../helpers/ToggleVisible'
	import { AbilityGroups } from '../../rules/Abilities'
	import AbilityCard from './AbilityCard.svelte'

	export let group

	let xpGroups = [...AbilityGroups]
</script>

<div class='xp-group-section'>
	<div
		class='xp-group-title'
		on:click={() => xpGroups = ToggleVisible(group, xpGroups)}
	>
		{group.name}XP Abilities
	</div>
	{#if group.visible}
		{#each group.list as ability}
			<AbilityCard {ability} />
		{/each}
	{/if}
</div>

<style>
	.xp-group-section {
		border: 1px solid lime;
		padding: 1rem;
	}
	.xp-group-title {
		font-size: 1.25rem;
		text-align: center;
	}
</style>
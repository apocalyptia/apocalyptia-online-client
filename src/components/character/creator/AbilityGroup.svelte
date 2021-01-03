<script>
	import AbilityCard from 'components/character/creator/AbilityCard.svelte'

	export let group, MasterAbilityList
</script>


<details class='ability-group-details'>
	<summary>
		{group.name}XP Abilities
	</summary>
	<div class='ability-group-card'>
		{#each group.list as ability}
			<AbilityCard {ability} {MasterAbilityList}/>
		{/each}
	</div>
</details>


<style>
	.ability-group-details {
		margin: var(--std-margin) 0;
	}
</style>
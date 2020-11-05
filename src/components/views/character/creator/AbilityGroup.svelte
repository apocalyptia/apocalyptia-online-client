<script>
	import AbilityCard from 'views/character/creator/AbilityCard.svelte'

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
		margin: var(--s100);
	}
</style>
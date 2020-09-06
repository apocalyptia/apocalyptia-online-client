<script>
	import AbilityCard from './AbilityCard.svelte'
	import ToggleVisible from '../../helpers/utils/ToggleVisible'

	export let group, MasterAbilityList
</script>


<details>
	<summary>
		{group.name}XP Abilities
	</summary>
		{#each group.list as ability}
			<div class='ability-card'>
				<AbilityCard {ability} {MasterAbilityList}/>
			</div>
		{/each}
</details>


<style>
	.ability-card {
		margin: var(--s100);
		border: var(--s1) solid;
	}
	.ability-card:hover {
		background-color: lime;
		color: rgba(15, 30, 15, 1);
		cursor: pointer;
	}
</style>
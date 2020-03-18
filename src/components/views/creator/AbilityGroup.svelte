<script>
import ToggleVisible from '../../helpers/ToggleVisible'
import AbilityCard from './AbilityCard.svelte'

export let group
export let MasterAbilityList
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
	padding: var(--s50);
	border: var(--s1) solid;
}
</style>
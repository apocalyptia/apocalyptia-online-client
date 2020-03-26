<script>
import { character } from '../../../stores/characterStore'

export let ability
export let MasterAbilityList

ability = MasterAbilityList.filter(a => a.name == ability.name)[0]
</script>


<div class='ability-section'>
	<span class='ability-name-label'>{ability.name}</span>
	<span>
		Taken:
		<select
			name={ability.name}
			bind:value={ability.taken}
			on:change={() => $character.abilities = MasterAbilityList.filter(a => a.taken)}
		>
			{#each Array(ability.max+1) as _, i}
				<option value={i}>{i}</option>
			{/each}
		</select>
	</span>
	<span class='taken-selector'></span>
</div>


<style>
.ability-section {
	align-items: center;
	display: flex;
	margin: var(--s100);
	justify-content: space-between;
	width: 100%;
}
select {
	width: var(--s300);
}
</style>
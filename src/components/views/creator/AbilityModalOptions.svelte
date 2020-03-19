<script>
import { character } from '../../../stores/characterStore'

export let ability
export let MasterAbilityList

let OptionList = MasterAbilityList.filter(a => a.name == ability.name)
</script>


<div class='options-section'>
	{#each OptionList as ability}
		<div class='ability-section'>
			<span class='ability-option-label'>
				{ability.options[0].name}
			</span>
			<span class='taken-label'>Taken:
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
		</div>
	{/each}
</div>


<style>
.options-section {
	width: 100%;
}
.ability-section {
	align-items: center;
	border: var(--s1) dashed;
	display: flex;
	margin: var(--s100) auto;
	padding: var(--s50);
}
.ability-option-label {
	flex: 2;
}
.taken-label {
	flex: 1;
}
select {
	width: var(--s300);
}
</style>
<script>
import { character } from '../../../../stores'
import Capitalize from '../../../functions/Capitalize'

export let ability
export let MasterAbilityList

let OptionList = MasterAbilityList.filter(a => a.name == ability.name)

const updateAbilities = () => {
	$character.abilities = MasterAbilityList.filter(ability => ability.taken)
}
</script>


<div class='options-section'>
	{#each OptionList as ability}
		<div class='ability-section'>
			<span class='ability-option-label'>{Capitalize(ability.options[0].name)}</span>
			<span class='taken-label'>Taken:
				<select
					name={ability.name}
					bind:value={ability.taken}
					on:change={updateAbilities}
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
	border: var(--smallest-unit) dashed;
	display: flex;
	margin: var(--base-unit) auto;
	padding: var(--half-unit);
}
.ability-option-label {
	flex: 2;
}
.taken-label {
	flex: 1;
}
</style>
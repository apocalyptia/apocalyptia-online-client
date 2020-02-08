<script>
	import { character } from '../../../stores'
	import Capitalize from '../../helpers/Capitalize'

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
		border: 1px dashed;
		display: flex;
		margin: 1rem auto;
		padding: .5rem;
	}
	.ability-option-label {
		flex: 2;
	}
	.taken-label {
		flex: 1;
	}
</style>
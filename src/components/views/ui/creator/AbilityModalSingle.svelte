<script>
	import { character } from '../../../../stores'
	import Capitalize from '../../../helpers/Capitalize'

	export let ability
	export let MasterAbilityList

	ability = MasterAbilityList.filter(a => a.name == ability.name)[0]

	const updateAbilities = () => {
		$character.abilities = MasterAbilityList.filter(ability => ability.taken)
	}
</script>


<div class='ability-section'>
	<span class='ability-name-label'>{Capitalize(ability.name)}</span>
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
	<span class='taken-selector'></span>
</div>


<style>
	.ability-section {
		align-items: center;
		display: flex;
		margin: 1rem;
		justify-content: space-between;
		width: 100%;
	}
	.ability-name-label {
		flex: 2;
	}
	.taken-label {
		flex: 1;
	}
</style>
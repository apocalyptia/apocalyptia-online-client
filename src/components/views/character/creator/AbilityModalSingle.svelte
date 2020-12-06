<script>
	import { character } from 'stores/characterStore.js'

	export let ability, MasterAbilityList

	ability = MasterAbilityList.filter(a => a.name == ability.name)[0]
</script>


<div class='options-section'>
	<div class='ability-selection'>
		<div class='ability-name-label'>
			{ability.name}
		</div>
		<div class='taken-label'>Taken:
			<select
				name={ability.name}
				bind:value={ability.taken}
				on:blur={_ => $character.abilities = MasterAbilityList.filter(a => a.taken)}
			>
				{#each Array(ability.max+1) as _, i}
					<option value={i}>{i}</option>
				{/each}
			</select>
		</div>
	</div>
</div>


<style>
	.options-section {
		width: 100%;
	}
	.ability-selection {
		align-items: center;
		border: 1px dashed;
		display: flex;
		justify-content: space-between;
		margin: var(--std-margin) auto;
		padding: var(--s50);
	}
	.ability-name-label {
		overflow-x: hidden;
	}
	select {
		width: var(--square);
	}
</style>
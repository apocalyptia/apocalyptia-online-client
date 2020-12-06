<script>
	import { character } from 'stores/characterStore.js'

	export let ability, MasterAbilityList

	let OptionList = MasterAbilityList.filter(a => a.name == ability.name)
</script>


<div class='options-section'>
	{#each OptionList as ability}
		<div class='ability-selection'>
			<span class='ability-name-label'>
				{ability.opts[0].name}
			</span>
			<span class='taken-label'>Taken:
				<select
					name={ability.name}
					bind:value={ability.taken}
					on:blur={_ => $character.abilities = MasterAbilityList.filter(a => a.taken)}
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
	.ability-selection {
		align-items: center;
		border: 1px dashed;
		display: flex;
		justify-content: space-between;
		margin: var(--std-margin) auto;
		padding: var(--s50);
		overflow-x: hidden;
	}
	.ability-name-label {
		overflow-x: hidden;
	}
	select {
		width: var(--square);
	}
</style>
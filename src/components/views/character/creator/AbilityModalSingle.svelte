<script>
	import { character } from 'src/stores/characterStore'

	export let ability, MasterAbilityList

	ability = MasterAbilityList.filter(a => a.name == ability.name)[0]
</script>


<div class='options-section'>
	<div class='ability-section'>
		<div class='ability-name-label'>
			{ability.name}
		</div>
		<div class='taken-label'>Taken:
			<select
				name={ability.name}
				bind:value={ability.taken}
				on:blur={() => $character.abilities = MasterAbilityList.filter(a => a.taken)}
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
	.ability-section {
		align-items: center;
		border: var(--s1) dashed;
		display: flex;
		justify-content: space-between;
		margin: var(--s100) auto;
		padding: var(--s50);
	}
	select {
		width: var(--s300);
	}
</style>
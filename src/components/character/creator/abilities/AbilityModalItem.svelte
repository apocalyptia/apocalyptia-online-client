<script>
	import characterStore from '/src/stores/characterStore.js'

	export let ability

	const updateAbilities = _ => {
		$characterStore.updateAbilities($characterStore)
	}
</script>

<div class='ability-selection'>
	<span class='ability-name-label'>
		{ability.opts[0] ? ability.opts[0].name : ability.name}
	</span>
	<span class='taken-label'>Taken:
		<select
			name={ability.name}
			bind:value={ability.qty}
			on:blur={updateAbilities}
		>
			{#each Array(ability.max+1) as _, i}
				<option value={i}>{i}</option>
			{/each}
		</select>
	</span>
</div>


<style>
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
		width: 75%;
	}
	.taken-label {
		width: 25%;
	}
	select {
		width: var(--square);
	}
</style>
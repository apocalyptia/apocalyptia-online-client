<script>
	import characterStore from '/src/stores/characterStore.js'

	export let ability

	$: disabled = ability.experience > $characterStore.properties.experience.current && ability.quantity === 0
</script>

<!-- svelte-ignore a11y-no-onchange -->
<span class="ability-controls">
	<select name={ability.name} bind:value={ability.quantity} class={disabled ? 'crimson-btn' : ''} {disabled}>
		{#each Array(ability.max + 1) as _, takenNum}
			<option value={takenNum} selected={takenNum === ability.quantity}>
				{takenNum}
			</option>
		{/each}
	</select>
</span>

<style>
	select {
		align-items: center;
		display: flex;
		font-size: var(--s125);
		font-weight: bold;
		justify-content: center;
		text-align: center;
	}
</style>

<script>
	export let ability
</script>

<!-- svelte-ignore a11y-no-onchange -->
<select name="skill-options" class="skill-options-selector" bind:value={ability.selectedOption}>
	{#each ability.options as optionName, optionNumber}
		<option value={optionNumber} selected={optionNumber === 0}>
			{optionName}
		</option>
	{/each}
</select>

<style>
	.skill-options-selector {
		margin-bottom: var(--margin);
		width: 100%;
	}
</style>

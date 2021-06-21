<script>
	export let ability

	console.log(ability.selectedOption)
</script>

<!-- svelte-ignore a11y-no-onchange -->
<select
	name='skill-options'
	class='skill-options-selector'
	bind:value={ability.selectedOption}
>
	{#each ability.options as optionName, optionNumber}
		<option value={optionNumber} selected={optionNumber === 0}>
			{optionName}
		</option>
	{/each}
</select>

<style>
	.skill-options-selector {
		margin-bottom: var(--std-margin);
		width: 100%;
	}
</style>
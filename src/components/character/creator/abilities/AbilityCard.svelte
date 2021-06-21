<script>
	import OptionsSelector from '/src/components/character/creator/abilities/OptionsSelector.svelte'

	export let ability
</script>

<div class='ability-card'>
	{#if ability.options.length}
		<OptionsSelector bind:ability={ability} />
	{/if}
	{#each ability.description as description}
		<p>{description}</p>
	{/each}
	<hr />
	<p class='ability-footer'>
		<span class='ability-experience'>
			Cost: {ability.experience} XP
		</span>
		<span class='ability-max'>
			Max: {ability.max}
		</span>
	</p>
</div>

<style>
	hr {
		margin: var(--std-margin) 0;
	}
	.ability-card {
		padding: var(--std-padding);
	}
	.ability-footer {
		display: flex;
		font-weight: bold;
		justify-content: space-between;
		text-align: right;
		width: 100%;
	}
</style>
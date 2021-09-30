<script>
	import abilitiesStore from '/src/stores/abilitiesStore.js'
	import AbilityCard from '/src/components/character/creator/abilities/AbilityCard.svelte'
	import TakenSelector from '/src/components/character/creator/abilities/TakenSelector.svelte'
</script>


{#each $abilitiesStore.workingList as ability}
	<div class="ability-list-item">
		<details id={`details-${ability.name.replace(' ', '')}`} class="ability-card" bind:open={ability.open}>
			<summary class="ability-titlebar">
				<h4>{ability.open ? '-' : '+'} {ability.name}</h4>
				<TakenSelector bind:ability />
			</summary>
			<AbilityCard bind:ability />
		</details>
	</div>
{/each}


<style>
	.ability-card {
		width: 100%;
	}
	.ability-list-item {
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin: var(--margin) 0;
	}
	.ability-titlebar {
		display: flex;
		justify-content: space-between;
		padding: var(--padding);
	}
</style>

<script>
	import { character } from '../../../stores'
	import AbilityModal from './AbilityModal.svelte'

	export let ability

	let showModal = false

	const displayModal = () => showModal = true
</script>

<div class='ability-card' on:click={displayModal}>
	<div class='card-row'>
		<span class='ability-name'>{ability.name}</span>
		<span class='ability-taken'>Taken: {ability.taken}</span>
	</div>
	<div class='card-row'>
		<span class='ability-description'>{ability.description}</span>
	</div>
</div>
{#if showModal}
	<AbilityModal on:close='{() => showModal = false}' {ability} />
{/if}

<style>
	.ability-card {
		margin: 1rem 0;
	}
	.card-row {
		display: flex;
		justify-content: space-between;
	}
	.ability-name{
		flex: 2;
		font-weight: bold;
		text-decoration: underline;
	}
	.ability-taken {
		flex: 1;
		font-weight: bold;
	}
</style>
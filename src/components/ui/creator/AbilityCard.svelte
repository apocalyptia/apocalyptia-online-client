<script>
	import { character } from '../../../stores'
	import AbilityModal from './AbilityModal.svelte'

	export let ability

	let showModal = false

	const displayModal = () => showModal = true
</script>

<div class='ability-card' on:click={displayModal}>
	<div class='ability-name'>{ability.name}</div>
	<div class='ability-description-section'>
		<span class='description-label'>Descripiton:</span>
		<span class='ability-description'>{ability.description}</span>
	</div>
	<div class='ability-options-section'>
		{#if ability.options[0] != ""}
			<span class='ability-options'>
				<select
					name={ability.name}
					bind:value={ability.selection}
				>
					{#each ability.options as option, index}
						<option value={index}>
							{option.name}
						</option>
					{/each}
				</select>
			</span>
		{/if}
	</div>
	<div class='ability-taken-section'>
		<span class='taken-label'>Taken:</span>
		<span class='ability-taken'>{ability.taken}</span>
	</div>
</div>
{#if showModal}
	<AbilityModal on:close='{() => showModal = false}' {ability} />
{/if}

<style>
	.ability-card {
		margin: 1rem 0;
	}
	.ability-name,
	.description-label {
		font-weight: bold;
	}
	.ability-name {
		text-decoration: underline;
	}
	.ability-options {
		display: block;
	}
</style>
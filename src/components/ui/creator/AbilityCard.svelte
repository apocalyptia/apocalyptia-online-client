<script>
	import { character } from '../../../stores'
	import AbilityModal from './AbilityModal.svelte'

	export let ability

	let showModal = false

	const displayModal = () => {
		console.log('MODAL!')
		showModal = true
	}


</script>

<div class='ability-card' on:click={displayModal}>
	<div class='ability-name'>{ability.name}</div>
	<div class='description-section'>
		<span class='description-label'>
			Descripiton:
		</span>
		<span class='ability-description'>
			{ability.description}
		</span>
	</div>
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
{#if showModal}
	<AbilityModal on:close="{() => showModal = false}" {ability} />
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
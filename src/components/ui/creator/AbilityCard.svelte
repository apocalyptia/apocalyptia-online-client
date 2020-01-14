<script>
	import { character } from '../../../stores'
	import AbilityModal from './AbilityModal.svelte'

	export let ability

	let showModal = false

	const displayModal = () => {
		showModal = true
	}
</script>

<div class='ability-card'>
	<div class='col m-col'>
		<span class='ability-name'>{ability.name}</span>
	</div>
	<div class='col l-col'>
		<span class='description-label'>Descripiton: </span>
		<span class='ability-description'>
			{ability.description}
		</span>
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
	<div class='col s-col'>
		<span class='max-label'>Max: </span>
		<span class='ability-max'>{ability.max}</span>
	</div>
	<div class='col s-col'>
		<span class='xp-label'>XP: </span>
		<span class='ability-xp'>{ability.xp}</span>
	</div>
</div>

<style>
	.ability-card {
		margin: 1rem 0;
	}
	@media only screen and (max-width: 1000px) {
		.ability-name,
		.description-label,
		.max-label,
		.xp-label {
			font-weight: bold;
		}
		.ability-name {
			text-decoration: underline;
		}
		.ability-options {
			display: block;
		}
	}
	@media only screen and (min-width: 1000px) {
		.description-label,
		.max-label,
		.xp-label {
			display: none;
		}
		.l-col, .m-col, .s-col {
			display: inline-block;
		}
		.l-col {
			width: 50%;
		}
		.m-col {
			width: 20%;
		}
		.s-col {
			text-align: center;
			width: 8%;
		}
	}
	.col {
		vertical-align: top;
	}
</style>
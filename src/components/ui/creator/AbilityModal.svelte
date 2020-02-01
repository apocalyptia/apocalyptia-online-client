<script>
	import { createEventDispatcher, onDestroy } from 'svelte'
	import AbilityModalOptions from './AbilityModalOptions.svelte'

	export let ability

	const dispatch = createEventDispatcher()

	const close = () => dispatch('close')

	let modal

	const handle_keydown = e => {
		if (e.key === 'Escape') close()
	}

	const previously_focused = typeof document !== 'undefined' && document.activeElement

	if (previously_focused) onDestroy(() => previously_focused.focus())
</script>

<svelte:window on:keydown={handle_keydown}/>

<div class="modal-background" on:click={close}></div>

<div class="modal" role="dialog" aria-modal="true" bind:this={modal}>
	<div class='ability-name'>
		<h2>{ability.name}</h2>
	</div>
	<div class='description-section'>
		<span class='description-label'>Descripiton:</span>
		<span class='ability-description'>{ability.description}</span>
	</div>
	<div class='stats-section'>
		<span class='column'>
			<span class='xp-label'>XP:</span>
			<span class='XP-number'>{ability.xp}</span>
		</span>
		<span class='column'>
			<span class='max-label'>Max:</span>
			<span class='max-number'>{ability.max}</span>
		</span>
		<span class='column'>
			<span class='taken-label'>Taken:
				<select
					name={ability.name}
					bind:value={ability.taken}
				>
					{#each Array(ability.max+1) as _, i}
						<option value={i}>{i}</option>
					{/each}
				</select>
			</span>
		</span>
		<!-- {#if ability.options[0] == ""}
			<div class='center-column'>
				<span class='taken-label'>Taken:</span>
				<select
					name={ability.name}
					bind:value={ability.taken}
				>
					{#each Array(ability.max+1) as _, i}
						<option value={i}>{i}</option>
					{/each}
				</select>
			</div>
		{/if} -->
	</div>
	<!-- {#if ability.options[0] != ""}
		<AbilityModalOptions {ability} />
	{/if} -->
	<!-- svelte-ignore a11y-autofocus -->
	<div class='button-row'>
		<button autofocus on:click={close}>Close</button>
	</div>
</div>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0,0,0,0.3);
	}
	.modal {
		position: absolute;
		left: 1rem;
		right: 1rem;
		top: 1rem;
		width: calc(100vw - 4rem);
		max-width: 32rem;
		max-height: calc(100vh - 4rem);
		overflow: auto;
		padding: 1rem;
		border-radius: 0.2rem;
		background: rgba(0,0,0,0.9);
		border: 1px solid lime;
	}
	.button-row {
		text-align: center;
	}
	.stats-section {
		align-items: baseline;
		display: flex;
		justify-content: space-between;
		padding: 1rem;
	}
	.column {
		flex: 1;
		text-align: center;
	}
</style>

<script>
	import { createEventDispatcher, onDestroy } from 'svelte'

	export let ability

	const dispatch = createEventDispatcher()

	const close = () => dispatch('close')

	let modal

	const handle_keydown = e => {
		if (e.key === 'Escape') close()
		if (e.key === 'Tab') {
			const nodes = modal.querySelectorAll('*')
			const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0)
			let index = tabbable.indexOf(document.activeElement)
			if (index === -1 && e.shiftKey) index = 0
			index += tabbable.length + (e.shiftKey ? -1 : 1)
			index %= tabbable.length
			tabbable[index].focus()
			e.preventDefault()
		}
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
		<div class='left-column'>
			<span class='xp-label'>XP:</span>
			<span class='XP-number'>{ability.xp}</span>
		</div>
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
		<div class='right-column'>
			<span class='max-label'>Max:</span>
			<span class='max-number'>{ability.max}</span>
		</div>
	</div>
	<div class='options-section'>
		{#if ability.options[0] != ""}
			<span class='ability-options'>
				{#each ability.options as option}
					<div class='ability-option'>
					<input type='checkbox' />
					<span class='ability-option-label'>{option.name}</span>
					</div>
				{/each}
			</span>
		{/if}
	</div>

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
	.options-section {
		margin: 1rem;
	}
	button {
		display: block;
		margin: 0 auto;
	}
</style>

<script>
	import { createEventDispatcher, onDestroy } from 'svelte'
	import AbilityModalList from 'components/character/creator/AbilityModalList.svelte'

	export let ability, MasterAbilityList

	const dispatch = createEventDispatcher()

	const handleKeydown = e => { if (e.key === 'Escape') dispatch('close') }

	const previouslyFocused = typeof document !== 'undefined' && document.activeElement

	if (previouslyFocused) onDestroy(_ => previouslyFocused.focus())
</script>


<svelte:window on:keydown={handleKeydown}/>
<div class="modal-background" on:click={_ => dispatch('close')}></div>
<div class="modal" role="dialog" aria-modal="true">
	<div class='modal-content'>
		<div class='ability-name'>
			<h2>{ability.name}</h2>
		</div>
		<div class='description-section'>
			<span class='description-label'>Description:</span>
			<span class='ability-description'>{ability.desc}</span>
		</div>
		<div class='stats-section'>
			<AbilityModalList {ability} {MasterAbilityList} options={ability.opts.length}/>
		</div>
		<div class='btn-row'>
			<button on:click={_ => dispatch('close')}>Save</button>
		</div>
	</div>
</div>


<style>
	.modal-background {
		background-color: rgba(0,0,0,0.7);
		height: 100vh;
		left: 0;
		position: fixed;
		top: 0;
		width: 100vw;
		z-index: 6;
	}
	.modal {
		background-color: var(--sec-color);
		border-radius: var(--radius);
		border: 2px solid;
		color: var(--pri-color);
		height: fit-content;
		left: 50vw;
		max-height: 75vh;
		overflow: scroll;
		padding: var(--std-padding);
		position: fixed;
		scrollbar-width: none;
		top: 50vh;
		transform: translate(-50%, -50%);
		width: 80vw;
		z-index: 9;
	}
	.stats-section {
		align-items: baseline;
		display: flex;
		justify-content: space-between;
	}
	.description-section {
		line-height: 1.5;
		margin: var(--std-margin) auto;
	}
	.description-label {
		font-weight: bold;
	}
	::-webkit-scrollbar {
		display: none;
	}
</style>

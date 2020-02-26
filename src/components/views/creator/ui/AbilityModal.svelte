<script>
import { createEventDispatcher, onDestroy } from 'svelte'
import AbilityModalSingle from './AbilityModalSingle.svelte'
import AbilityModalOptions from './AbilityModalOptions.svelte'

export let ability
export let MasterAbilityList

const dispatch = createEventDispatcher()

const close = () => dispatch('close')

const handle_keydown = e => {
	if (e.key === 'Escape') close()
}

const previously_focused = typeof document !== 'undefined' && document.activeElement

if (previously_focused) onDestroy(() => previously_focused.focus())
</script>


<svelte:window on:keydown={handle_keydown}/>
<div class="modal-background" on:click={close}></div>
<div class="modal" role="dialog" aria-modal="true">
	<div class='ability-name'><h2>{ability.name}</h2></div>
	<div class='description-section'>
		<span class='description-label'>Descripiton:</span>
		<span class='ability-description'>{ability.description}</span>
	</div>
	<div class='stats-section'>
		{#if ability.options[0]}
			<AbilityModalOptions {ability} {MasterAbilityList} />
		{:else}
			<AbilityModalSingle {ability} {MasterAbilityList} />
		{/if}
	</div>
	<div class='button-row'>
		<button on:click={close}>Close</button>
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
	position: fixed;
	left: 10vw;
	right: 10vw;
	top: 10vh;
	height: fit-content;
	max-height: 75vh;
	overflow: scroll;
	padding: var(--base-unit);
	border-radius: var(--third-unit);
	background: rgba(0,0,0,0.9);
	border: var(--smallest-unit) solid;
}
.button-row {
	text-align: center;
}
.stats-section {
	align-items: baseline;
	display: flex;
	justify-content: space-between;
	padding: var(--base-unit);
}
.description-section {
	margin-top: var(--base-unit);
}
.description-label {
	font-weight: bold;
}
</style>

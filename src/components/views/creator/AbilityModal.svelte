<script>
import { createEventDispatcher, onDestroy } from 'svelte'
import AbilityModalSingle from './AbilityModalSingle.svelte'
import AbilityModalOptions from './AbilityModalOptions.svelte'


export let ability
export let MasterAbilityList


const dispatch = createEventDispatcher()

const handle_keydown = e => { if (e.key === 'Escape') dispatch('close') }

const previously_focused = typeof document !== 'undefined' && document.activeElement

if (previously_focused) onDestroy(() => previously_focused.focus())
</script>


<svelte:window on:keydown={handle_keydown}/>
<div class="modal-background" on:click={() => dispatch('close')}></div>
<div class="modal" role="dialog" aria-modal="true">
	<div class='modal-content'>
		<div class='ability-name'><h2>{ability.name}</h2></div>
		<div class='description-section'>
			<span class='description-label'>Descripiton:</span>
			<span class='ability-description'>{ability.desc}</span>
		</div>
		<div class='stats-section'>
			{#if ability.opts.length}
				<AbilityModalOptions {ability} {MasterAbilityList}/>
			{:else}
				<AbilityModalSingle {ability} {MasterAbilityList}/>
			{/if}
		</div>
		<div class='btn-row'>
			<button on:click={() => dispatch('close')}>Close</button>
		</div>
	</div>
</div>


<style>
.modal-background {
	background: rgba(0,0,0,0.3);
	height: 100vh;
	left: 0;
	position: fixed;
	top: 0;
	width: 100vw;
}
.modal {
	background: rgba(0,0,0,0.9);
	border-radius: var(--radius);
	border: var(--s1) solid;
	height: fit-content;
	left: 50vw;
	max-height: 75vh;
	overflow: scroll;
	position: fixed;
	scrollbar-width: none;
	top: 50vh;
	transform: translate(-50%, -50%);
	width: 80vw;
}
.modal-content {
	margin: var(--s100);
}
.btn-row {
	text-align: center;
}
.stats-section {
	align-items: baseline;
	display: flex;
	justify-content: space-between;
}
.description-section {
	margin-top: var(--s100);
}
.description-label {
	font-weight: bold;
}
::-webkit-scrollbar {
	display: none;
}
</style>

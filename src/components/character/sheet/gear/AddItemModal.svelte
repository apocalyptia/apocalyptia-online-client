<script>
	import getItemList from '/src/utils/getItemList.js'
	import characterStore from '/src/stores/characterStore.js'
	import { createEventDispatcher, onDestroy } from 'svelte'

	export let category

	let itemList = getItemList(category)

	let selectedItem = itemList[0]

	const dispatch = createEventDispatcher()

	const handleKeydown = (e) => {
		if (e.key === 'Escape') dispatch('close')
	}

	const previouslyFocused = typeof document !== 'undefined' && document.activeElement

	if (previouslyFocused) onDestroy(() => previouslyFocused.focus())

	function add() {
		if (category === 'ammo') selectedItem.quantity = 0
		$characterStore.gear[category].inventory.push(selectedItem)
		$characterStore = $characterStore
		dispatch('close')
	}
</script>

<svelte:window on:keydown={handleKeydown} />
<div class='modal-background' on:click={() => dispatch('close')} />
<div class='modal' role='dialog' aria-modal='true'>
	<div class='item-selection'>
		<select class='item-selector' bind:value={selectedItem}>
			{#each itemList as item}
				<option value={item}>{item.name}</option>
			{/each}
		</select>
	</div>
	<div class='btn-row'>
		<button class='small-cntr-btn' on:click={() => add()}>Add</button>
		<button class='small-cntr-btn' on:click={() => dispatch('close')}>Close</button>
	</div>
</div>

<style>
	.modal-background {
		background-color: rgba(0, 0, 0, 0.7);
		height: 100vh;
		left: 0;
		position: fixed;
		top: 0;
		width: 100vw;
	}
	.modal {
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: var(--radius);
		border: 1px solid;
		color: var(--pri-color);
		height: fit-content;
		left: 50vw;
		max-height: 75vh;
		overflow: scroll;
		padding: var(--s200);
		position: fixed;
		scrollbar-width: none;
		top: 50vh;
		transform: translate(-50%, -50%);
		width: 80vw;
	}
	.item-selection {
		margin-bottom: var(--s200);
		text-align: center;
	}
	.item-selector {
		width: 60%;
	}
	::-webkit-scrollbar {
		display: none;
	}
</style>

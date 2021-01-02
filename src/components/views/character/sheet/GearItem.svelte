<script>
	import GearBlock from 'views/widgets/GearBlock.svelte'
	import TrashButton from 'buttons/TrashButton.svelte'
	import { characterStore } from 'stores/characterStore.js'

	export let mode, category, item, index = 0

	const trashItem = _ => {
		$characterStore.gear[category].inventory.splice(index, 1)
		$characterStore = $characterStore
	}
</script>


<div class='gear-item'>
	<GearBlock {item} {mode} />
	{#if mode != 'readonly'}
		<TrashButton on:click={trashItem} />
	{/if}
</div>


<style>
	.gear-item {
		border: 1px solid var(--pri-color);
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		margin-bottom: var(--s100);
		padding: var(--std-padding);
		width: 100%;
	}
</style>
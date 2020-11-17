<script>
	import GearBlock from 'views/widgets/GearBlock.svelte'
	import TrashButton from 'icons/TrashButton.svelte'
	import { character } from 'stores/characterStore.js'

	export let mode, category, item, index

	const trashItem = ({ category, index=0 }) => {
		$character.gear[category].inventory.splice(index, 1)
		$character = $character
	}
</script>


<div class='gear-item'>
	<GearBlock {item} {mode} />
	{#if mode != 'readonly'}
		<TrashButton args={{ category, index }} deleteFunction={trashItem} />
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
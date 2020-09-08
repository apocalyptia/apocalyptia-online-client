<script>
	import GearBlock from '../widgets/GearBlock.svelte'
	import { character } from '../../stores/characterStore'

	export let mode, category, item, index

	const trashItem = (category, index=0) => {
		$character.gear[category].inventory.splice(index, 1)
		$character = $character
	}
</script>


<div class='gear-item'>
	<GearBlock {mode} {item} />
	{#if mode != 'readonly'}
		<div class='trash'>
			<button class='btn-box trash-btn' on:click={() => trashItem(category, index)}>
				<div class='btn-icon'>&#10006;</div>
			</button>
		</div>
	{/if}
</div>


<style>
	.gear-item {
		border: 1px solid lime;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		margin-bottom: var(--s100);
		padding: var(--s100);
		width: 100%;
	}
	.trash {
		text-align: right;
	}
</style>
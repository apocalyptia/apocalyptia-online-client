<script>
	import GearBlock from 'src/components/views/ui/GearBlock.svelte'
	import { character } from 'src/stores/characterStore'

	export let gearType, item, index, readonly = false

	const trashItem = (item, index=0) => {
		$character.gear[item].inventory.splice(index, 1)
		$character = $character
	}
</script>


<div class='gear-item'>
	<GearBlock rule={item} />
	{#if !readonly}
		<div class='trash'>
			<button class='trash-button' on:click={() => trashItem(gearType, index)}>
				<div class='button-icon'>&#10006;</div>
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
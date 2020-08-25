<script>
	import GearBlock from '../ui/GearBlock.svelte'
	import { character } from '../../../stores/characterStore'

	export let gearType, item, index

	const trashItem = (item, index=0) => {
		$character.gear[item].inventory.splice(index, 1)
		$character = $character
	}
</script>


<div class='gear-item'>
	<GearBlock rule={item} />
	<div class='trash'>
		<button class='trash-item-button' on:click={() => trashItem(gearType, index)}>
			<div class='button-icon'>&#10006;</div>
		</button>
	</div>
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
	.trash-item-button {
		background-color: crimson;
		border: 1px solid crimson;
		color: rgba(15, 30, 15, 1);
		height: var(--s250);
		padding: 0;
		width: var(--s250);
		-webkit-text-fill-color: rgba(15, 30, 15, 1);
	}
	.trash-item-button:hover {
		background-color: rgba(15, 30, 15, 1);
		color: crimson;
		-webkit-text-fill-color: crimson;
	}
	.button-icon {
		font-size: var(--s150);
	}
</style>
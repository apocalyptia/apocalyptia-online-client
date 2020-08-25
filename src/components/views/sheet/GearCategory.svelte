<script>
	import AddItemModal from './AddItemModal.svelte'
	import Capitalize from '../../helpers/Capitalize'
	import GearItem from './GearItem.svelte'
	import { character } from '../../../stores/characterStore'

	export let gearType

	let modalVisible = false

	const toggleAddItemModal = () => modalVisible = !modalVisible
</script>


<details class='gear-category' open>
	<summary>{Capitalize(gearType)}</summary>
	<div class='gear-item-list'>
		{#each $character.gear[gearType].inventory as item, index}
			<GearItem {gearType} {item} {index}/>
		{/each}
	</div>
	<div class='add-item-section'>
		<button class='add-item-button' on:click={toggleAddItemModal}>
			<div class='button-icon'>&#10010;</div>
		</button>
		{#if modalVisible}
			<AddItemModal on:close={toggleAddItemModal} {gearType} />
		{/if}
	</div>
</details>


<style>
	.gear-category {
		border: 1px solid lime;
		box-sizing: border-box;
		display: block;
		margin-bottom: var(--s100);
	}
	.gear-item-list {
		padding: var(--s100);
		padding-bottom: 0;
	}
	.add-item-section {
		padding-top: 0;
	}
	.add-item-button {
		background-color: lime;
		border: 1px solid lime;
		color: rgba(15, 30, 15, 1);
		font-size: var(--s150);
		font-weight: bold;
		height: var(--s250);
		padding: 0;
		width: var(--s250);
		-webkit-text-fill-color: rgba(15, 30, 15, 1);
	}
	.add-item-button:hover {
		background-color: rgba(15, 30, 15, 1);
		color: lime;
		-webkit-text-fill-color: lime;
	}
	.button-icon {
		font-size: var(--s150);
		display: flex;
		justify-content: space-evenly;
		align-content: bottom;
	}
</style>
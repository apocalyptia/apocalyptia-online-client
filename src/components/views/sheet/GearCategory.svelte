<script>
	import Capitalize from '../../helpers/Capitalize'
	import GearItem from './GearItem.svelte'
	import ItemModal from './ItemModal.svelte'
	import { character } from '../../../stores/characterStore'

	export let gearType

	let modalVisible = false

	const toggleModal = () => modalVisible = !modalVisible
</script>


<details class='gear-category' open>
	<summary>{Capitalize(gearType)}</summary>
	<div class='gear-item-list'>
		{#each $character.gear[gearType].inventory as item, index}
			<GearItem {gearType} {item} {index}/>
		{/each}
	</div>
	<div class='add-item-section'>
		<button class='add-item-button' on:click={toggleModal}>
			<div class='button-icon'>+</div>
		</button>
		{#if modalVisible}
			<ItemModal on:close={toggleModal} {gearType} />
		{/if}
	</div>
</details>


<style>
	.gear-category {
		border: 1px solid lime;
		box-sizing: border-box;
		display: block;
		margin-bottom: var(--s100);
		width: 100%;
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
	}.add-item-button:hover {
		background-color: rgba(15, 30, 15, 1);
		color: lime;
	}
</style>
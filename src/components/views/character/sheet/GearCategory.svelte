<script>
	import AddItemModal from 'src/components/views/character/sheet/AddItemModal.svelte'
	import Capitalize from 'src/components/helpers/Capitalize'
	import GearItem from 'src/components/views/character/sheet/GearItem.svelte'
	import { character } from 'src/stores/characterStore'

	export let gearType, readonly = false

	let modalVisible = false

	const toggleAddItemModal = () => modalVisible = !modalVisible
</script>


<details class='gear-category' open>
	<summary>{Capitalize(gearType)}</summary>
	<div class='gear-item-list'>
		{#each $character.gear[gearType].inventory as item, index}
			<GearItem {gearType} {item} {index} {readonly} />
		{/each}
	</div>
	{#if !readonly}
		<div class='add-section'>
			<button class='add-button' on:click={toggleAddItemModal}>
				<div class='button-icon'>&#10010;</div>
			</button>
			{#if modalVisible}
				<AddItemModal on:close={toggleAddItemModal} {gearType} />
			{/if}
		</div>
	{/if}
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
</style>
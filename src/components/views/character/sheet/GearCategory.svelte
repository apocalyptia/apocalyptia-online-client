<script>
	import AddButton from 'buttons/AddButton.svelte'
	import AddItemModal from 'views/character/sheet/AddItemModal.svelte'
	import Capitalize from 'utils/Capitalize.js'
	import GearItem from 'views/character/sheet/GearItem.svelte'
	import { characterStore } from 'stores/characterStore.js'

	export let mode, category

	$: inventory = $characterStore.gear[category].inventory

	let modalVisible = false

	const toggleAddItemModal = _ => modalVisible = !modalVisible
</script>


<details class='gear-category' close>
	<summary>{Capitalize(category)}</summary>
	<div class='gear-category-card'>
		<div class='gear-item-list'>
			{#each inventory as item, index}
				<GearItem {mode} {category} {item} {index} />
			{/each}
		</div>
		{#if mode != 'readonly'}
			<div class='add-section'>
				<AddButton on:click={toggleAddItemModal} />
				{#if modalVisible}
					<AddItemModal on:close={toggleAddItemModal} {category} />
				{/if}
			</div>
		{/if}
	</div>
</details>


<style>
	.gear-category {
		border: 1px solid var(--pri-color);
		box-sizing: border-box;
		display: block;
		margin-bottom: var(--s100);
	}
	.gear-category-card {
		margin: var(--std-margin);
	}
</style>
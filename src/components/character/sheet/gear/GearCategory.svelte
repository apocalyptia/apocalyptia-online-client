<script>
	import AddButton from '$components/buttons/AddButton.svelte'
	import AddItemModal from '$components/character/sheet/gear/AddItemModal.svelte'
	import GearItem from '$components/character/sheet/gear/GearItem.svelte'

	export let mode, category

	let modalVisible = false

	function toggleAddItemModal() {
		modalVisible = !modalVisible
	}
</script>

<details class="gear-category" close>
	<summary>{category.name}</summary>
	<div class="gear-category-card">
		<div class="gear-item-list">
			{#each category.inventory as item, index}
				<GearItem {mode} {category} {item} {index} />
			{/each}
		</div>
		{#if mode === 'edit'}
			<div class="add-section">
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
		border: var(--solid-border);
		box-sizing: border-box;
		display: block;
		margin-bottom: var(--s100);
	}
	.gear-category-card {
		margin: var(--margin);
	}
</style>

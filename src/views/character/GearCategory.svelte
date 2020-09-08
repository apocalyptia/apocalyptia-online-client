<script>
	import AddItemModal from './AddItemModal.svelte'
	import Capitalize from '../../helpers/utils/Capitalize'
	import GearItem from './GearItem.svelte'
	import { character } from '../../stores/characterStore'

	export let mode, category

	let modalVisible = false

	const toggleAddItemModal = () => modalVisible = !modalVisible
</script>


<details class='gear-category' close>
	<summary>{Capitalize(category)}</summary>
	<div class='gear-category-card'>
		<div class='gear-item-list'>
			{#each $character.gear[category].inventory as item, index}
				<GearItem {mode} {category} {item} {index} />
			{/each}
		</div>
		{#if mode != 'readonly'}
			<div class='add-section'>
				<button class='btn-box add-btn' on:click={toggleAddItemModal}>
					<div class='btn-icon'>&#10010;</div>
				</button>
				{#if modalVisible}
					<AddItemModal on:close={toggleAddItemModal} {category} />
				{/if}
			</div>
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
	.gear-category-card {
		margin: var(--s100);
	}
</style>
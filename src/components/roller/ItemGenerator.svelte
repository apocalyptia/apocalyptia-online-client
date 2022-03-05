<script>
	import capitalize from '$utils/text/capitalize.js'
	import DiceButton from '$components/buttons/DiceButton.svelte'
	import GearBlock from '$components/widgets/GearBlock.svelte'
	import randomRoll from '$utils/random/dice/randomRoll.js'

	export let category

	$: items = []

	$: quantity = 1

	function randomItem() {
		items = []
		for (let i = 0; i < quantity; i++) {
			items.push(randomRoll(Object.values(category[1])))
		}
	}
</script>

<details class="item-category" open={items.length}>
	<summary class="category-header">
		<div class="category-name">
			<h3>{capitalize(category[0])}</h3>
		</div>
		<input type="number" min="1" step="1" class="item-quantity" bind:value={quantity} />
		<DiceButton func={randomItem} />
	</summary>
	{#if items.length}
		{#each items as item}
			<hr />
			<div class="item-content">
				<GearBlock {item} mode={'roller'} />
			</div>
		{/each}
	{/if}
</details>

<style>
	.item-category {
		margin-bottom: var(--margin);
	}
	.category-header {
		display: flex;
	}
	.category-name {
		align-items: center;
		display: flex;
		flex: 3;
	}
	.item-quantity {
		margin-right: var(--margin);
		width: 3ch;
	}
	.item-content {
		padding-top: var(--padding);
		text-align: left;
	}
</style>

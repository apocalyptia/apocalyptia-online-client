<script>
	import capitalize from '/src/utils/text/capitalize.js'
	import DiceButton from '/src/components/buttons/DiceButton.svelte'
	import GearBlock from '/src/components/widgets/GearBlock.svelte'
	import randomRoll from '/src/utils/random/dice/randomRoll.js'

	export let category

	let item = ''

	function randomItem() {
		item = randomRoll(Object.values(category[1]))
	}
</script>

<div class="item-category">
	<div class="category-header">
		<div class="category-name">
			<h3>{capitalize(category[0])}</h3>
		</div>
		<DiceButton func={randomItem} />
	</div>
	{#if item}
		<div class="item-content">
			<GearBlock {item} mode={'roller'} />
		</div>
	{/if}
</div>

<style>
	.item-category {
		border: var(--std-border) var(--pri-color) solid;
		padding: var(--std-padding);
		margin-bottom: var(--std-margin);
	}
	.category-header {
		display: flex;
	}
	.category-name {
		align-items: center;
		display: flex;
		flex: 3;
	}
	.item-content {
		padding-top: var(--std-padding);
	}
</style>

<script>
	import DiceButton from '/src/components/buttons/DiceButton.svelte'
	import GearBlock from '/src/components/widgets/GearBlock.svelte'
	import RandomRoll from '/src/rules/random/RandomRoll.js'

	export let category

	let item = ''

	const randomItem = () => item = RandomRoll(category.list)
</script>


<div class='item-category'>
	<div class='category-header'>
		<div class='category-name'>{category.name}</div>
		<DiceButton func={randomItem} />
	</div>
	{#if item}
		<div class='item-content'>
			<GearBlock {item} mode={'roller'}/>
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
		font-size: var(--s125);
		font-weight: bold;
	}
	.item-content {
		padding-top: var(--std-padding);
	}
</style>
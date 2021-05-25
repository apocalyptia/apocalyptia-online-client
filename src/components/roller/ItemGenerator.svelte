<script>
	import Capitalize from '/src/utils/text/Capitalize.js'
	import DiceButton from '/src/components/buttons/DiceButton.svelte'
	import GearBlock from '/src/components/widgets/GearBlock.svelte'
	import RandomRoll from '/src/utils/random/dice/RandomRoll.js'

	export let category

	let item = ''

	const randomItem = () => item = RandomRoll(Object.values(category[1]))
</script>


<div class='item-category'>
	<div class='category-header'>
		<div class='category-name'>{Capitalize(category[0])}</div>
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
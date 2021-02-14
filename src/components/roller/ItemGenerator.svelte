<script>
	import GearBlock from 'components/widgets/GearBlock.svelte'
	import RandomRoll from 'rules/random/RandomRoll.js'

	export let category

	let item = ''

	const randomItem = _ => item = RandomRoll(category.list)
</script>


<div class='item-category'>
	<div class='category-header'>
		<div class='category-name'>{category.name}</div>
		<button on:click={_ => randomItem()}>Random</button>
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
	button {
		flex: 1;
	}
</style>
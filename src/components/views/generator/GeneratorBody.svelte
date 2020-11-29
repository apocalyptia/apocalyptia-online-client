<script>
	import DiceRoller from 'views/generator/DiceRoller.svelte'
	import ItemGenerator from 'views/generator/ItemGenerator.svelte'
	import MasterGearList from 'lists/gear/MasterGearList.js'
</script>


<div class='generator-body'>
	<h1>Generator</h1>
	<DiceRoller />
	{#each MasterGearList as category}
		<ItemGenerator {category} />
	{/each}
</div>


<style>
	.generator-body {
		bottom: 0;
		height: calc(100vh - var(--square));
		overflow: scroll;
		padding-left: var(--std-padding);
		padding-right: var(--std-padding);
		padding-top: var(--std-padding);
		position: absolute;
		top: 0;
		width: 100%;
	}
	h1 {
		margin: auto;
	}
</style>
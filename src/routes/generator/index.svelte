<script>
	import BackButton from 'icons/BackButton.svelte'
	import DiceRoller from 'views/generator/DiceRoller.svelte'
	import ItemGenerator from 'views/generator/ItemGenerator.svelte'
	import MasterGearList from 'lists/gear/MasterGearList.js'
</script>


<svelte:head>
	<title>Apocalyptia Online - Generator</title>
</svelte:head>
<div class='generator-body'>
	<h1>Generator</h1>
	<DiceRoller />
	{#each MasterGearList as category}
		<ItemGenerator {category} />
	{/each}
</div>
<BackButton path={'/'} />


<style>
	.generator-body {
		bottom: 0;
		height: calc(100vh - var(--square));
		overflow: scroll;
		padding-left: var(--std-padding);
		padding-right: var(--std-padding);
		padding-top: var(--std-padding);
		position: absolute;
		top: var(--square);
		width: 100%;
	}
	h1 {
		margin: auto;
	}
</style>
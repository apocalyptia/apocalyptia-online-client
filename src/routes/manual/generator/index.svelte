<script>
	import BackButton from 'buttons/BackButton.svelte'
	import DiceRoller from 'views/generator/DiceRoller.svelte'
	import ItemGenerator from 'views/generator/ItemGenerator.svelte'
	import MasterGearList from 'lists/gear/MasterGearList.js'
</script>


<svelte:head>
	<title>Apocalyptia Online - Generator</title>
</svelte:head>
<div class='generator-body page-body'>
	<h1>Generator</h1>
	<DiceRoller />
	{#each MasterGearList as category}
		<ItemGenerator {category} />
	{/each}
</div>
<BackButton path={'/'} />


<style>
	h1 {
		margin-bottom: var(--std-margin);
	}
</style>
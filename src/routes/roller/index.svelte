<script>
	import BackButton from '$components/buttons/BackButton.svelte'
	import DiceRoller from '$components/roller/DiceRoller.svelte'
	import ItemGenerator from '$components/roller/ItemGenerator.svelte'
	import MasterGearList from '$rules/lists/gear/MasterGearList.js'
</script>


<svelte:head>
	<title>Apocalyptia Online - Roller</title>
</svelte:head>
<div class='roller-body page-body'>
	<h1>Roller</h1>
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
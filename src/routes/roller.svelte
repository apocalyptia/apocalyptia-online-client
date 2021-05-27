<script>
	import BackButton from '/src/components/buttons/BackButton.svelte'
	import DiceRoller from '/src/components/roller/DiceRoller.svelte'
	import Gear from '/src/rules/Gear.js'
	import ItemGenerator from '/src/components/roller/ItemGenerator.svelte'

	const masterGearList = [
		'Master Gear List',
		Object.values(Gear).flatMap(g => Object.values(g).flatMap(i => i))
	]
</script>


<svelte:head>
	<title>Apocalyptia Online - Roller</title>
</svelte:head>
<div class='roller-body page-body'>
	<h1>Roller</h1>
	<DiceRoller />
	<details>
		<summary><h2>Gear</h2></summary>
		<div class='gear-category-list'>
			<ItemGenerator category={masterGearList} />
			{#each Object.entries(Gear) as category}
				<ItemGenerator {category} />
			{/each}
		</div>
	</details>
</div>
<BackButton path={'/'} />


<style>
	h1 {
		margin-bottom: var(--std-margin);
	}
	.gear-category-list {
		padding: var(--std-padding);
	}
</style>
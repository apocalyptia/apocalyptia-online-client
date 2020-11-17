<script>
	import BackButton from 'icons/BackButton.svelte'
	import MasterGearList from 'lists/gear/MasterGearList.js'
	import GearBlock from 'views/widgets/GearBlock.svelte'
	import RandomRoll from 'random/RandomRoll.js'
	import d6Roll from 'random/d6Roll.js'

	let roll = 0, mod = 0, result = 0

	const randomItem = (item) => {
		item.value = RandomRoll(item.list)
		return item
	}

	const rolld6 = _ => {
		roll = d6Roll()
		if (roll == -666) {
			roll = '1, 1'
			result = 'Botch!'
		}
		else result = roll + mod
	}
</script>


<svelte:head>
	<title>Apocalyptia Online Random Generator</title>
</svelte:head>
<div class='generator-page-body'>
	<h1>Random Generator</h1>
	<div class='section-card'>
		<p><span class='gear-category'>d6 Roll</span></p>
		<p>Modifier: <input type='number' bind:value='{mod}'></p>
		<p>Roll: {roll}</p>
		<div class='item-category'>
			<h3>Result:</h3> {result}
			<button on:click={rolld6}>Random</button>
		</div>
	</div>
	{#each MasterGearList as gearItem, i}
		<div class='section-card'>
			<div class='item-category'>
				<h1>{gearItem.name}</h1>
				<button on:click={_ => MasterGearList[i] = randomItem(gearItem)}>Random</button>
			</div>
			{#if gearItem.value != undefined}
				<h2>{gearItem.value.name}</h2>
				<GearBlock item={gearItem.value} mode={'manual'}/>
			{/if}
		</div>
	{/each}
</div>
<BackButton path={'/'} />


<style>
	.generator-page-body {
		position: absolute;
		top: var(--s50);
		left: 0;
		right: 0;
		padding-top: var(--s200);
		margin-bottom: var(--s150);
	}
	.item-category {
		display: flex;
		justify-content: space-between;
	}
	h1 {
		margin: auto;
	}
	h2 {
		margin: var(--std-margin) 0;
	}
</style>
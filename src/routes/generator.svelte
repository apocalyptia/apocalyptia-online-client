<script>
	import BackButton from 'icons/BackButton.svelte'
	import MasterGearList from 'lists/gear/MasterGearList.js'
	import GearBlock from 'views/widgets/GearBlock.svelte'
	import RandomRoll from 'random/RandomRoll.js'
	import d6Roll from 'random/d6Roll.js'
	// import { onDestroy } from 'svelte'

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

	// let frame

	// let rolls = 0
	// const max = 9999

	// const rolld6 = _ => {
	// 	(function update() {
	// 		while (rolls < max) {
	// 			roll = d6Roll()
	// 			if (roll == -666) {
	// 				roll = '1, 1'
	// 				result = 'Botch!'
	// 			}
	// 			else result = roll + mod
	// 			rolls++
	// 		}
	// 	}())
	// 	frame = requestAnimationFrame(update)
	// }

	// onDestroy(() => cancelAnimationFrame(frame))
</script>


<svelte:head>
	<title>Apocalyptia Online - Generator</title>
</svelte:head>
<div class='generator-page-body'>
	<h1>Generator</h1>
	<div class='item-category'>
		<h1>d6 Roll</h1>
		<div class='item-content'>
			<p>Modifier: <input type='number' class='mod' bind:value='{mod}'></p>
			<p>Roll: {roll}</p>
			<h1>Result: {result} </h1>
		</div>
		<div class='btn-row'>
			<button on:click={rolld6}>Random</button>
		</div>
	</div>
	{#each MasterGearList as gearItem, i}
		<div class='item-category'>
			<h1>{gearItem.name}</h1>
			<div class='item-content'>
				{#if gearItem.value != undefined}
					<GearBlock item={gearItem.value} mode={'manual'}/>
				{/if}
			</div>
			<div class='btn-row'>
				<button on:click={_ => MasterGearList[i] = randomItem(gearItem)}>Random</button>
			</div>
		</div>
	{/each}
</div>
<BackButton path={'/'} />


<style>
	.generator-page-body {
		height: calc(100vh - var(--square));
		overflow: scroll;
		position: absolute;
		top: 0;
		padding-left: var(--square);
		padding-right: var(--square);
		padding-top: var(--std-padding);
		bottom: 0;
		width: 100%;
	}
	.item-category {
		border: var(--std-border) var(--pri-color) solid;
		padding: var(--std-padding);
		margin: var(--std-margin) 0;
	}
	h1 {
		margin: auto;
	}
	.item-content {
		margin: var(--std-margin) 0;
	}
	.mod {
		width: 6ch;
	}
</style>
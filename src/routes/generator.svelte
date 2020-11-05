<script>
	import BackButton from 'views/widgets/BackButton.svelte'
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
		result = roll + mod
	}
</script>


<svelte:head>
	<title>Apocalyptia Online Random Generator</title>
</svelte:head>
<h1>Random Generator</h1>
<div class='section-card'>
	<p><span class='gear-category'>d6 Roll</span></p>
	<p>Modifier: <input type='number' bind:value='{mod}'></p>
	<p>Roll: {#if result == -666}1, 1{:else}{roll}{/if}</p>
	<div class='item-category'>
		<h3>Result:</h3> {#if result == -666}Botch!{:else}{result}{/if}
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
<BackButton path={'/'} />


<style>
	.item-category {
		display: flex;
		justify-content: space-between;
	}
	h1 {
		margin: auto;
	}
	h2 {
		margin: var(--s100) 0;
	}
</style>
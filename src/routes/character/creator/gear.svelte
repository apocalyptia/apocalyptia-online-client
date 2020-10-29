<script>
	import Capitalize from 'utils/Capitalize.js'
	import GearBlock from 'views/widgets/GearBlock.svelte'
	import RandomStartingGear from 'random/RandomStartingGear.js'
	import { character } from 'stores/characterStore.js'
	import { beforeUpdate } from 'svelte'

	let gearedUp = false

	const randomStartingGear = _ => {
		$character = RandomStartingGear($character, $character.props.luck.score)
	}

	beforeUpdate(_ => {
		gearedUp = Object.values($character.gear).every(g => g.inventory.length)
		console.log(gearedUp)
	})
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Creator - Gear</title>
</svelte:head>
<div class='creator-page'>
	<h1>Gear</h1>
	<div class='explanation'>
		<p>You start with some random Gear:</p>
		<ol>
			<li>One piece of Armor</li>
			<li>One Melee weapon</li>
			<li>One Ranged weapon</li>
			<li>1d6 rounds of Ammo</li>
			<li>Random items = Luck</li>
		</ol>
	</div>
	{#if gearedUp}
		{#each Object.keys($character.gear) as type}
			<div class='section-card'>
				<div class='item-category'>
					<h2>{Capitalize(type)}</h2>
				</div>
				{#if type == 'equipment'}
					{#each $character.gear.equipment.inventory as equipment}
						<div class='item'>
							<GearBlock item={equipment} mode={'edit'} />
						</div>
					{/each}
				{:else}
					<div class='item'>
						<GearBlock item={$character.gear[type].inventory[0]} mode={'edit'} />
					</div>
				{/if}
			</div>
		{/each}
	{:else}
		<div class='btn-row'>
			<button class='small-cntr-btn' on:click={randomStartingGear}>Random</button>
		</div>
	{/if}
</div>


<style>
	.item-category {
		margin-bottom: var(--s100);
	}
	.item {
		border: 1px dotted lime;
		margin-bottom: var(--s100);
		padding: var(--s100);
	}
</style>
<script>
	import CenterCard from '$components/widgets/CenterCard.svelte'
	import Gear from '$rules/Gear.js'
	import ItemGenerator from '$components/roller/ItemGenerator.svelte'

	const masterGearList = ['Master Gear List', Object.values(Gear).flatMap((g) => Object.values(g).flatMap((i) => i)) ]
</script>

<svelte:head>
	<title>Apocalyptia Online - Loot</title>
</svelte:head>
<CenterCard title={'Loot Roller'}>
	<ItemGenerator category={masterGearList} />
	{#each Object.entries(Gear) as category}
		<ItemGenerator {category} />
	{/each}
</CenterCard>

<script>
	import CenterCard from '/src/components/widgets/CenterCard.svelte'
</script>


<svelte:head>
	<title>Apocalyptia Online - Roller</title>
</svelte:head>
<CenterCard title={'Rollers'}>
	<a href='/roller/d6' class='link-btn'> d6 </a>
	<a href='/roller/loot' class='link-btn'> Loot </a>
</CenterCard>


<style>
	a {
		margin-bottom: var(--std-margin);
	}
	a:last-child {
		margin-bottom: 0;
	}
</style>
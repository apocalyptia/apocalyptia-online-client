<script>
	import CenterCard from '$components/widgets/CenterCard.svelte'
</script>

<svelte:head>
	<title>Apocalyptia Online - Roller</title>
</svelte:head>
<CenterCard title={'Rollers'}>
	<a href="/roller/d6" class="link-btn"> d6 </a>
	<a href="/roller/loot" class="link-btn"> Loot </a>
</CenterCard>

<style>
	a {
		margin-bottom: var(--margin);
		text-decoration: none;
	}
	a:last-child {
		margin-bottom: 0;
	}
</style>

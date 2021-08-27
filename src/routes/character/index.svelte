<script>
	import CenterCard from '/src/components/widgets/CenterCard.svelte'
	import playerStore from '/src/stores/playerStore.js'
</script>

<svelte:head>
	<title>Apocalyptia Online - Character</title>
</svelte:head>
<CenterCard title={'Character Menu'}>
	{#if $playerStore.selectedCharacter}
		<a href="/character/sheet" class="link-btn">Character Sheet</a>
	{/if}
	<a href="/character/new" class="link-btn">New Character</a>
	<a href="/character/manager" class="link-btn">Character Manager</a>
</CenterCard>

<style>
	a {
		margin-bottom: var(--margin);
	}
	a:last-child {
		margin-bottom: 0;
	}
</style>

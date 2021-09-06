<script>
	import CenterCard from '/src/components/widgets/CenterCard.svelte'
	import playerStore from '/src/stores/playerStore.js'
	import { onMount } from 'svelte'

	onMount(() => {
		// TODO: Needs work. playerStore.selected is true for Character Sheet btn even after last character is deleted.
		if ($playerStore.selected === null) {
			$playerStore = $playerStore.initializePlayer()
		}
		console.log($playerStore.selected)
	})
</script>


<svelte:head>
	<title>Apocalyptia Online - Character</title>
</svelte:head>
<CenterCard title={'Character Menu'}>
	{#if $playerStore.selected}
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

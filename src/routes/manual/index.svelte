<script>
	import BackButton from 'icons/BackButton.svelte'
	import ManualBody from 'views/manual/ManualBody.svelte'
	import ManualHeader from 'views/manual/ManualHeader.svelte'
	import ManualList from 'lists/ManualList.js'
	import SearchEngine from 'utils/SearchEngine.js'

	let searchTerm = ''

	let ruleList = ManualList.map(r => [...r.list]).flat()

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, ManualList)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual</title>
</svelte:head>
<ManualHeader on:search={e => handleSearch(e)} />
{#if searchTerm}
	<ManualBody {ruleList} />
{:else}
	<div class='manual-body'>
		{#each ManualList as chapter}
			<a href={`/manual/${chapter.name.toLowerCase()}`}
				class='link-btn menu-btn'>
				{chapter.name}
			</a>
		{/each}
	</div>
{/if}
<BackButton path={'/'} />


<style>
	a {
		width: 100%;
	}
</style>
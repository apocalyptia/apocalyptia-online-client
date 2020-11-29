<script>
	import BackButton from 'icons/BackButton.svelte'
	import ManualBody from 'views/manual/ManualBody.svelte'
	import ManualHeader from 'views/manual/ManualHeader.svelte'
	import TraitsList from 'lists/TraitsList.js'
	import SearchEngine from 'utils/SearchEngine.js'

	let searchTerm = ''

	let ruleList = TraitsList.list.sort((a, b) => (a.name > b.name)).flat()

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, TraitsList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Traits</title>
</svelte:head>
<ManualHeader chapter={'Traits'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual'} />
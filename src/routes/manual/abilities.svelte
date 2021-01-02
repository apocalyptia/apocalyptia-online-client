<script>
	import BackButton from 'buttons/BackButton.svelte'
	import ManualBody from 'views/manual/ManualBody.svelte'
	import ManualHeader from 'views/manual/ManualHeader.svelte'
	import AbilitiesList from 'lists/AbilitiesList.js'
	import SearchEngine from 'utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = AbilitiesList.list.sort((a, b) => (a.name > b.name)).flat()

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, AbilitiesList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Abilities</title>
</svelte:head>
<ManualHeader chapter={'Abilities'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual'} />
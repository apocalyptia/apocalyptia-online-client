<script>
	import DrugsList from 'rules/lists/gear/DrugsList.js'
	import BackButton from 'components/buttons/BackButton.svelte'
	import ManualBody from 'components/manual/ManualBody.svelte'
	import ManualHeader from 'components/manual/ManualHeader.svelte'
	import SearchEngine from 'utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = DrugsList.list.sort((a, b) => (a.name > b.name)).flat()

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, DrugsList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Drugs</title>
</svelte:head>
<ManualHeader chapter={'Drugs'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual/gear'} />
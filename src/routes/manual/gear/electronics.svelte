<script>
	import ElectronicsList from 'rules/lists/gear/ElectronicsList.js'
	import BackButton from 'components/buttons/BackButton.svelte'
	import ManualBody from 'components/manual/ManualBody.svelte'
	import ManualHeader from 'components/manual/ManualHeader.svelte'
	import SearchEngine from 'utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = ElectronicsList.list.sort((a, b) => (a.name > b.name)).flat()

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, ElectronicsList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Electronics</title>
</svelte:head>
<ManualHeader chapter={'Electronics'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual/gear'} />
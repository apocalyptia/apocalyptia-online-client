<script>
	import BackButton from 'components/buttons/BackButton.svelte'
	import ManualBody from 'components/manual/ManualBody.svelte'
	import ManualHeader from 'components/manual/ManualHeader.svelte'
	import DiseasesList from 'rules/lists/DiseasesList.js'
	import SearchEngine from 'utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = DiseasesList.list.sort((a, b) => (a.name > b.name)).flat()

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, DiseasesList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Diseases</title>
</svelte:head>
<ManualHeader chapter={'Diseases'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual'} />
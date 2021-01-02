<script>
	import BackButton from 'buttons/BackButton.svelte'
	import ManualBody from 'views/manual/ManualBody.svelte'
	import ManualHeader from 'views/manual/ManualHeader.svelte'
	import PropertiesList from 'lists/PropertiesList.js'
	import SearchEngine from 'utils/SearchEngine.js'

	let searchTerm = ''

	let ruleList = PropertiesList.list.sort((a, b) => (a.name > b.name)).flat()

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, PropertiesList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Properties</title>
</svelte:head>
<ManualHeader chapter={'Properties'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual'} />
<script>
	import BackButton from 'buttons/BackButton.svelte'
	import ManualBody from 'views/manual/ManualBody.svelte'
	import ManualHeader from 'views/manual/ManualHeader.svelte'
	import StatusList from 'lists/StatusList.js'
	import SearchEngine from 'utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = StatusList.list.sort((a, b) => (a.name > b.name)).flat()

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, StatusList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Status</title>
</svelte:head>
<ManualHeader chapter={'Status'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual'} />
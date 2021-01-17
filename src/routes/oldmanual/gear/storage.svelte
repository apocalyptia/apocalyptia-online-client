<script>
	import StorageList from 'rules/lists/gear/StorageList.js'
	import BackButton from 'components/buttons/BackButton.svelte'
	import ManualBody from 'components/manual/ManualBody.svelte'
	import ManualHeader from 'components/manual/ManualHeader.svelte'
	import SearchEngine from 'utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = StorageList.list.sort((a, b) => (a.name > b.name)).flat()

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, StorageList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Storage</title>
</svelte:head>
<ManualHeader chapter={'Storage'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual/gear'} />
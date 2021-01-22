<script>
	import BackButton from '$components/buttons/BackButton.svelte'
	import ManualBody from '$components/manual/ManualBody.svelte'
	import ManualHeader from '$components/manual/ManualHeader.svelte'
	import ManualList from '$rules/lists/ManualList.js'
	import SearchEngine from '$utils/search/SearchEngine.js'

	let searchTerm = ''

	$: ruleList = ManualList

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, ManualList)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual</title>
</svelte:head>
<ManualHeader chapter={'Manual'} on:search={e => handleSearch(e)} />
<ManualBody chapter={'Manual'} ruleList={searchTerm.length ? ruleList : ManualList.list} />
<BackButton path={'/'} />
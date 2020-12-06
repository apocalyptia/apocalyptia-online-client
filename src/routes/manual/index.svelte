<script>
	import BackButton from 'icons/BackButton.svelte'
	import ManualBody from 'views/manual/ManualBody.svelte'
	import ManualHeader from 'views/manual/ManualHeader.svelte'
	import ManualList from 'lists/ManualList.js'
	import SearchEngine from 'utils/SearchEngine.js'

	let searchTerm = ''

	$: ruleList = ManualList

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, ManualList.map(r => [...r.list]).flat())
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual</title>
</svelte:head>
<ManualHeader chapter={'Manual'} on:search={e => handleSearch(e)} />
<ManualBody chapter={'Manual'} ruleList={searchTerm.length ? ruleList : ManualList} />
<BackButton path={'/'} />
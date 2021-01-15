<script>
	import DocumentList from 'rules/lists/gear/DocumentList.js'
	import BackButton from 'components/buttons/BackButton.svelte'
	import ManualBody from 'components/manual/ManualBody.svelte'
	import ManualHeader from 'components/manual/ManualHeader.svelte'
	import SearchEngine from 'utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = DocumentList.list.sort((a, b) => (a.name > b.name)).flat()

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, DocumentList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Documents</title>
</svelte:head>
<ManualHeader chapter={'Documents'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual/gear'} />
<script>
	import Alphabetize from '$utils/Alphabetize.js'
	import BackButton from '$components/buttons/BackButton.svelte'
	import ManualBody from '$components/manual/ManualBody.svelte'
	import ManualHeader from '$components/manual/ManualHeader.svelte'
	import SearchEngine from '$utils/search/SearchEngine.js'
	import ToolsList from '$rules/lists/gear/ToolsList.js'

	let searchTerm = ''

	let ruleList = Alphabetize(ToolsList.list)

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, ToolsList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Tools</title>
</svelte:head>
<ManualHeader chapter={'Tools'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual/gear'} />
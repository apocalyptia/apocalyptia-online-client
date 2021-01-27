<script>
	import Alphabetize from '$utils/Alphabetize.js'
	import ResourcesList from '$rules/lists/gear/ResourcesList.js'
	import BackButton from '$components/buttons/BackButton.svelte'
	import ManualBody from '$components/manual/ManualBody.svelte'
	import ManualHeader from '$components/manual/ManualHeader.svelte'
	import SearchEngine from '$utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = Alphabetize(ResourcesList.list)

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, ResourcesList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Resources</title>
</svelte:head>
<ManualHeader chapter={'Resources'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual/gear'} />
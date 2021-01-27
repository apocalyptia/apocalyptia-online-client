<script>
	import Alphabetize from '$utils/Alphabetize.js'
	import AttributesList from '$rules/lists/gear/attributes/AttributesList.js'
	import BackButton from '$components/buttons/BackButton.svelte'
	import ManualBody from '$components/manual/ManualBody.svelte'
	import ManualHeader from '$components/manual/ManualHeader.svelte'
	import SearchEngine from '$utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = Alphabetize(AttributesList.list)

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, AttributesList)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Attributes</title>
</svelte:head>
<ManualHeader chapter={'Attributes'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual/gear'} />
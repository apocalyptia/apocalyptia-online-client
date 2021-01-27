<script>
	import Alphabetize from '$utils/Alphabetize.js'
	import AccessoryList from '$rules/lists/gear/AccessoryList.js'
	import BackButton from '$components/buttons/BackButton.svelte'
	import ManualBody from '$components/manual/ManualBody.svelte'
	import ManualHeader from '$components/manual/ManualHeader.svelte'
	import SearchEngine from '$utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = Alphabetize(AccessoryList.list)

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, AccessoryList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Accessories</title>
</svelte:head>
<ManualHeader chapter={'Accessories'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual/gear'} />
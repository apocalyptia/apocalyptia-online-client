<script>
	import Alphabetize from '$utils/Alphabetize.js'
	import BackButton from '$components/buttons/BackButton.svelte'
	import ManualBody from '$components/manual/ManualBody.svelte'
	import ManualHeader from '$components/manual/ManualHeader.svelte'
	import SearchEngine from '$utils/search/SearchEngine.js'
	import WearablesList from '$rules/lists/gear/WearablesList.js'

	let searchTerm = ''

	let ruleList = Alphabetize(WearablesList.list)

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, WearablesList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Wearables</title>
</svelte:head>
<ManualHeader chapter={'Wearables'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual/gear'} />
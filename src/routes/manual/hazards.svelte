<script>
	import BackButton from '$components/buttons/BackButton.svelte'
	import ManualBody from '$components/manual/ManualBody.svelte'
	import ManualHeader from '$components/manual/ManualHeader.svelte'
	import HazardsList from '$rules/lists/HazardsList.js'
	import SearchEngine from '$utils/search/SearchEngine.js'

	let searchTerm = ''

	$: ruleList = HazardsList

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, HazardsList)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Hazards</title>
</svelte:head>
<ManualHeader chapter={'Hazards'} on:search={e => handleSearch(e)} />
<ManualBody chapter={'Hazards'} ruleList={searchTerm.length ? ruleList : HazardsList.list} />
<BackButton path={'/manual'} />
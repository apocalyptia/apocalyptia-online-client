<script>
	import Alphabetize from '$utils/Alphabetize.js'
	import BackButton from '$components/buttons/BackButton.svelte'
	import ManualBody from '$components/manual/ManualBody.svelte'
	import ManualHeader from '$components/manual/ManualHeader.svelte'
	import ManeuversList from '$rules/lists/ManeuversList.js'
	import SearchEngine from '$utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = Alphabetize(ManeuversList.list)

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, ManeuversList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Maneuvers</title>
</svelte:head>
<ManualHeader chapter={'Maneuvers'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual'} />
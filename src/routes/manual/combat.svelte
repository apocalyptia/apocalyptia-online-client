<script>
	import Alphabetize from '$utils/Alphabetize.js'
	import BackButton from '$components/buttons/BackButton.svelte'
	import ManualBody from '$components/manual/ManualBody.svelte'
	import ManualHeader from '$components/manual/ManualHeader.svelte'
	import CombatList from '$rules/lists/CombatList.js'
	import SearchEngine from '$utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = Alphabetize(CombatList.list)

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, CombatList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Combat</title>
</svelte:head>
<ManualHeader chapter={'Combat'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual'} />
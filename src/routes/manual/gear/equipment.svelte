<script>
	import Alphabetize from '$utils/Alphabetize.js'
	import EquipmentList from '$rules/lists/gear/EquipmentList.js'
	import BackButton from '$components/buttons/BackButton.svelte'
	import ManualBody from '$components/manual/ManualBody.svelte'
	import ManualHeader from '$components/manual/ManualHeader.svelte'
	import SearchEngine from '$utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = Alphabetize(EquipmentList.list)

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, EquipmentList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Equipment</title>
</svelte:head>
<ManualHeader chapter={'Equipment'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual/gear'} />
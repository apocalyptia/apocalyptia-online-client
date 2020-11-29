<script>
	import BackButton from 'icons/BackButton.svelte'
	import ManualBody from 'views/manual/ManualBody.svelte'
	import ManualHeader from 'views/manual/ManualHeader.svelte'
	import GearList from 'lists/GearList.js'
	import SearchEngine from 'utils/SearchEngine.js'

	let searchTerm = ''

	let ruleList = GearList.list.sort((a, b) => (a.name > b.name)).flat()

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, GearList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Gear</title>
</svelte:head>
<ManualHeader chapter={'Gear'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual'} />
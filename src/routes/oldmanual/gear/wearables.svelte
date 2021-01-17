<script>
	import WearablesList from 'rules/lists/gear/WearablesList.js'
	import BackButton from 'components/buttons/BackButton.svelte'
	import ManualBody from 'components/manual/ManualBody.svelte'
	import ManualHeader from 'components/manual/ManualHeader.svelte'
	import SearchEngine from 'utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = WearablesList.list.sort((a, b) => (a.name > b.name)).flat()

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
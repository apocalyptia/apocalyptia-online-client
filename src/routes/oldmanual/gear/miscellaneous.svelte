<script>
	import MiscellaneousList from 'rules/lists/gear/MiscellaneousList.js'
	import BackButton from 'components/buttons/BackButton.svelte'
	import ManualBody from 'components/manual/ManualBody.svelte'
	import ManualHeader from 'components/manual/ManualHeader.svelte'
	import SearchEngine from 'utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = MiscellaneousList.list.sort((a, b) => (a.name > b.name)).flat()

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, MiscellaneousList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Miscellaneous</title>
</svelte:head>
<ManualHeader chapter={'Miscellaneous'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual/gear'} />
<script>
	import BackButton from 'buttons/BackButton.svelte'
	import ManualBody from 'views/manual/ManualBody.svelte'
	import ManualHeader from 'views/manual/ManualHeader.svelte'
	import NeedsList from 'lists/NeedsList.js'
	import SearchEngine from 'utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = NeedsList.list.sort((a, b) => (a.name > b.name)).flat()

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, NeedsList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Needs</title>
</svelte:head>
<ManualHeader chapter={'Needs'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual'} />
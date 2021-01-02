<script>
	import BackButton from 'buttons/BackButton.svelte'
	import ManualBody from 'views/manual/ManualBody.svelte'
	import ManualHeader from 'views/manual/ManualHeader.svelte'
	import CoreList from 'lists/CoreList.js'
	import SearchEngine from 'utils/SearchEngine.js'

	let searchTerm = ''

	let ruleList = CoreList.list.sort((a, b) => (a.name > b.name)).flat()

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, CoreList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Core</title>
</svelte:head>
<ManualHeader chapter={'Core'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual'} />
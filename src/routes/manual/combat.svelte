<script>
	import BackButton from 'icons/BackButton.svelte'
	import ManualBody from 'views/manual/ManualBody.svelte'
	import ManualHeader from 'views/manual/ManualHeader.svelte'
	import CombatList from 'lists/CombatList.js'
	import SearchEngine from 'utils/SearchEngine.js'

	let searchTerm = ''

	let ruleList = CombatList.list.sort((a, b) => (a.name > b.name)).flat()

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
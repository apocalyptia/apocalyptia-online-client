<script>
	import BackButton from 'components/buttons/BackButton.svelte'
	import ManualBody from 'components/manual/ManualBody.svelte'
	import ManualHeader from 'components/manual/ManualHeader.svelte'
	import GearList from 'rules/lists/GearList.js'
	import SearchEngine from 'utils/search/SearchEngine.js'

	let searchTerm = ''

	$: ruleList = GearList

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, GearList)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Gear</title>
</svelte:head>
<ManualHeader chapter={'Gear'} on:search={e => handleSearch(e)} />
<ManualBody chapter={'Gear'} ruleList={searchTerm.length ? ruleList : GearList.list} />
<BackButton path={'/manual'} />
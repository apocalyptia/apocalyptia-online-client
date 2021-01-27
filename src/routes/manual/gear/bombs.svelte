<script>
	import Alphabetize from '$utils/Alphabetize.js'
	import BombList from '$rules/lists/gear/BombList.js'
	import BackButton from '$components/buttons/BackButton.svelte'
	import ManualBody from '$components/manual/ManualBody.svelte'
	import ManualHeader from '$components/manual/ManualHeader.svelte'
	import SearchEngine from '$utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = Alphabetize(BombList.list)

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, BombList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Bombs</title>
</svelte:head>
<ManualHeader chapter={'Bombs'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual/gear'} />
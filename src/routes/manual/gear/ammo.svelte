<script>
	import Alphabetize from '$utils/Alphabetize.js'
	import AmmoList from '$rules/lists/gear/ammo/AmmoList.js'
	import BackButton from '$components/buttons/BackButton.svelte'
	import ManualBody from '$components/manual/ManualBody.svelte'
	import ManualHeader from '$components/manual/ManualHeader.svelte'
	import SearchEngine from '$utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = Alphabetize(AmmoList.list)

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, AmmoList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Ammo</title>
</svelte:head>
<ManualHeader chapter={'Ammo'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual/gear'} />
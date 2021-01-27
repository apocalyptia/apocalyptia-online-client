<script>
	import Alphabetize from '$utils/Alphabetize.js'
	import RangedWeaponList from '$rules/lists/gear/RangedWeaponList.js'
	import BackButton from '$components/buttons/BackButton.svelte'
	import ManualBody from '$components/manual/ManualBody.svelte'
	import ManualHeader from '$components/manual/ManualHeader.svelte'
	import SearchEngine from '$utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = Alphabetize(RangedWeaponList.list)

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, RangedWeaponList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Ranged</title>
</svelte:head>
<ManualHeader chapter={'Ranged'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual/gear'} />
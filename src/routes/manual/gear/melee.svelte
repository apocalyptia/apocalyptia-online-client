<script>
	import Alphabetize from '$utils/Alphabetize.js'
	import MeleeWeaponList from '$rules/lists/gear/MeleeWeaponList.js'
	import BackButton from '$components/buttons/BackButton.svelte'
	import ManualBody from '$components/manual/ManualBody.svelte'
	import ManualHeader from '$components/manual/ManualHeader.svelte'
	import SearchEngine from '$utils/search/SearchEngine.js'

	let searchTerm = ''

	let ruleList = Alphabetize(MeleeWeaponList.list)

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, MeleeWeaponList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Melee</title>
</svelte:head>
<ManualHeader chapter={'Melee'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual/gear'} />
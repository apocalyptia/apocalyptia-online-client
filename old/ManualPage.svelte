<script>
	import alphabetize from '$utils/sorting/alphabetize.js'
	import ManualBody from '$components/manual/ManualBody.svelte'
	import ManualHeader from '$components/manual/ManualHeader.svelte'
	import searchEngine from '$utils/searching/searchEngine.js'

	export let page

	let searchTerm = ''

	let ruleList = alphabetize(page.list)

	function handleSearch(event) {
		searchTerm = event.detail
		ruleList = searchEngine(searchTerm, alphabetize(page.list))
	}
</script>

<svelte:head>
	<title>Apocalyptia Online - {page.name}</title>
</svelte:head>
<ManualHeader chapter={page.name} on:search={(e) => handleSearch(e)} />
<ManualBody chapter={page.name} ruleList={searchTerm.length ? ruleList : page.list} />

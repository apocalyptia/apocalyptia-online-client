<script>
	import alphabetize from '/src/utils/sorting/alphabetize.js'
	import ManualBody from '/src/components/manual/ManualBody.svelte'
	import ManualHeader from '/src/components/manual/ManualHeader.svelte'
	import searchEngine from '/src/utils/searching/searchEngine.js'

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

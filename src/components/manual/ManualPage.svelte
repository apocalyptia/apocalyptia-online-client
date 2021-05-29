<script>
	import Alphabetize from '/src/utils/sorting/Alphabetize.js'
	import ManualBody from '/src/components/manual/ManualBody.svelte'
	import ManualHeader from '/src/components/manual/ManualHeader.svelte'
	import SearchEngine from '/src/utils/searching/SearchEngine.js'

	export let page

	let searchTerm = ''

	let ruleList = Alphabetize(page.list)

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, Alphabetize(page.list))
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - {page.name}</title>
</svelte:head>
<ManualHeader
	chapter={page.name}
	on:search={e => handleSearch(e)}
/>
<ManualBody
	chapter={page.name}
	ruleList={searchTerm.length ? ruleList : page.list}
/>
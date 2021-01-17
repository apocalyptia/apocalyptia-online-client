<script context="module">
	import Capitalize from 'utils/Capitalize.js'

	export async function preload(page) {
		const { slug } = page.params
		const id = await import(`rules/lists/${Capitalize(slug)}List.js`)
		return { id }

		// return { id: page.params.id }
	}
</script>


<script>
	import BackButton from 'components/buttons/BackButton.svelte'
	import ManualBody from 'components/manual/ManualBody.svelte'
	import ManualHeader from 'components/manual/ManualHeader.svelte'
	import SearchEngine from 'utils/search/SearchEngine.js'
	import { onMount } from 'svelte'

	export let id

	let chapter

	onMount(async _ => chapter = await import(`rules/lists/${id.name}List.js`))

	let ruleList = chapter.list.sort((a, b) => (a.name > b.name)).flat()

	let searchTerm = ''

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, chapter.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - {chapter.name}</title>
</svelte:head>
<ManualHeader chapter={chapter.name} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual'} />
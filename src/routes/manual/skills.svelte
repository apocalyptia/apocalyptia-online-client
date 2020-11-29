<script>
	import BackButton from 'icons/BackButton.svelte'
	import ManualBody from 'views/manual/ManualBody.svelte'
	import ManualHeader from 'views/manual/ManualHeader.svelte'
	import SkillsList from 'lists/SkillsList.js'
	import SearchEngine from 'utils/SearchEngine.js'

	let searchTerm = ''

	let ruleList = SkillsList.list.sort((a, b) => (a.name > b.name)).flat()

	const handleSearch = event => {
		searchTerm = event.detail
		ruleList = SearchEngine(searchTerm, SkillsList.list)
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - Skills</title>
</svelte:head>
<ManualHeader chapter={'Skills'} on:search={e => handleSearch(e)} />
<ManualBody {ruleList} />
<BackButton path={'/manual'} />
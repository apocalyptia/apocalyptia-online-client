<script>
	import BackButton from 'components/buttons/BackButton.svelte'
	import ManualBody from 'components/manual/ManualBody.svelte'
	import ManualHeader from 'components/manual/ManualHeader.svelte'
	import SkillsList from 'rules/lists/SkillsList.js'
	import SearchEngine from 'utils/search/SearchEngine.js'

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
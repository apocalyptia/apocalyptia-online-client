<script>
	import BackButton from 'icons/BackButton.svelte'
	import ManualHeader from 'views/manual/ManualHeader.svelte'
	import ManualBody from 'views/manual/ManualBody.svelte'
	import ManualList from 'lists/ManualList.js'

	const chapter = window.location.href.substring(window.location.href.lastIndexOf('/')+1)

	const chapterObject = ManualList.filter(r => r.name.toLocaleLowerCase() == chapter)[0]

	const chapterRulesList = chapterObject.list.sort((a, b) => (a.name > b.name)).flat()

	const chapterName = chapterObject.name

	let ruleList = chapterRulesList

	$: searchTerm = ''

	$: if (searchTerm.length) {
		ruleList = chapterRulesList.filter(r => {
			return r.name.toLocaleLowerCase()
						.startsWith(searchTerm.toLocaleLowerCase())
		})
		if (!ruleList.length) {
			ruleList = chapterRulesList.filter(r => {
				return r.name.toLocaleLowerCase()
							.includes(searchTerm.toLocaleLowerCase())
			})
		}
	} else {
		ruleList = chapterRulesList
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual - {chapterName}</title>
</svelte:head>
<ManualHeader {chapterName} {searchTerm} />
<ManualBody {ruleList} />
<BackButton path={'/manual'} />
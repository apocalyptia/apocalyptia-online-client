<script>
	import BackButton from 'icons/BackButton.svelte'
	import ManualHeader from 'views/manual/ManualHeader.svelte'
	import ManualList from 'lists/ManualList.js'
	import ManualRule from 'views/manual/ManualRule.svelte'

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
<div class='manual-page-body'>
	{#if ruleList.length}
		<div class='rule-body-section'>
			{#each ruleList as rule}
				<ManualRule {rule} />
			{/each}
		</div>
	{:else}
		<div class='no-results'>
			<p>No results.</p>
		</div>
	{/if}
</div>
<BackButton path={'/manual'} />


<style>
	.manual-page-body {
		position: absolute;
		top: var(--square);
		left: 0;
		right: 0;
		padding-top: var(--s200);
		margin-bottom: var(--s150);
		margin-top: var(--s50);
	}
		.rule-body-section {
			align-items: center;
			display: flex;
			flex-direction: column;
		}
		.no-results {
			padding-left: 10vw;
			padding-top: 2vh;
		}
</style>
<script>
	import BackButton from 'views/widgets/BackButton.svelte'
	import Manual from 'rules/lists/Manual.js'
	import ManualRule from 'views/manual/ManualRule.svelte'

	const chapter = window.location.href.substring(window.location.href.lastIndexOf('/')+1)

	const chapterObject = Manual.filter(r => r.name.toLocaleLowerCase() == chapter)[0]

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
<div class='manual-header-section'>
	<div class='rules-name'>{chapterName}</div>
	<input type='text'
		class='search-bar'
		placeholder='Search'
		bind:value='{searchTerm}'
	/>
</div>
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
	.manual-header-section {
		align-items: center;
		background-color: rgb(15, 30, 15);
		border: 1px solid lime;
		display: flex;
		height: var(--s300);
		justify-content: space-around;
		left: 0;
		position: fixed;
		right: 0;
		top: var(--s350);
		z-index: 1;
	}
		.rules-name {
			font-size: var(--s150);
			font-weight: bold;
		}
		.search-bar {
			min-width: 100px;
			padding: var(--s25) var(--s100);
			text-align: left;
			width: 45%;
		}

	.manual-page-body {
		position: absolute;
		top: var(--s300);
		left: 0;
		right: 0;
		padding: var(--s200);
		margin-bottom: var(--s150);
		margin-top: var(--s50);
	}
		.rule-body-section {
			align-items: center;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}
		.no-results {
			padding-left: 10vw;
			padding-top: 2vh;
		}
</style>
<script>
	import BackButton from 'icons/BackButton.svelte'
	import ManualHeader from 'views/manual/ManualHeader.svelte'
	import ManualList from 'lists/ManualList.js'
	import ManualRule from 'views/manual/ManualRule.svelte'

	let masterRulesList = ManualList.map(r => [...r.list]).flat()

	let ruleList = masterRulesList

	$: searchTerm = ''

	$: if (searchTerm.length) {
		ruleList = masterRulesList.filter(r => {
			return r.name.toLocaleLowerCase()
						.startsWith(searchTerm.toLocaleLowerCase())
		})
		if (!ruleList.length) {
			ruleList = masterRulesList.filter(r => {
				return r.name.toLocaleLowerCase()
							.includes(searchTerm.toLocaleLowerCase())
			})
		}
	} else {
		ruleList = masterRulesList
	}
</script>


<svelte:head>
	<title>Apocalyptia Online - Manual</title>
</svelte:head>
<ManualHeader {searchTerm} />
<div class='manual-page-body'>
	{#if searchTerm === ''}
		{#each ManualList as chapter}
			<a href={`/manual/${chapter.name.toLowerCase()}`}
				class='link-btn menu-btn'
			>
				{chapter.name}
			</a>
		{/each}
	{:else}
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
	{/if}
</div>
<BackButton path={'/'} />


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
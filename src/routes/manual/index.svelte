<script>
	import BackButton from 'views/widgets/BackButton.svelte'
	import Manual from 'rules/lists/Manual.js'
	import ManualRule from 'views/manual/ManualRule.svelte'

	let masterRulesList = []

	masterRulesList = Manual.map(r => [...r.list]).flat()

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
<div class='manual-header-section'>
	<div class='rules-name'>Manual</div>
	<input type='text'
		class='search-bar'
		placeholder='Search'
		bind:value='{searchTerm}'
	/>
</div>
<div class='manual-page-body'>
	{#if searchTerm === ''}
		{#each Manual as chapter}
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
				<p>t</p>
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
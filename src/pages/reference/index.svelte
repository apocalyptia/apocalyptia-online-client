<script>
	import BackButton from '../../views/widgets/BackButton.svelte'
	import Reference from '../../rules/Reference'
	import RefRule from '../../views/reference/RefRule.svelte'
	import { beforeUpdate } from 'svelte'
	import { url } from '@roxi/routify'

	let masterRuleList = []
	Reference.forEach(r => masterRuleList = masterRuleList.concat(r.list))

	let ruleList = []

	$: searchTerm = ''

	beforeUpdate(_ => {
		ruleList = [...masterRuleList]
		if (searchTerm) {
			ruleList = ruleList.filter(rule => {
				const ruleName = rule.name.toLocaleLowerCase()
				const searchName = searchTerm.toLocaleLowerCase()
				return ruleName.includes(searchName)
			})
		}
	})
</script>


<svelte:head>
	<title>Apocalyptia Online - Reference</title>
</svelte:head>
<div class='ref-header-section'>
	<div class='rules-name'>
		Reference
	</div>
	<input type='text'
		class='search-bar'
		placeholder='Search'
		bind:value='{searchTerm}'
	/>
</div>
<div class='content-menu'>
	{#if !searchTerm}
		{#each Reference as chapter}
			<a href={$url(`/reference/${chapter.name.toLowerCase()}`)}
				class='link-btn menu-btn'
			>
				{chapter.name}
			</a>
		{/each}
	{:else}
	{#if ruleList.length}
		<div class='rule-body-section'>
			{#each ruleList as rule}
				<RefRule {rule} />
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
	.ref-header-section {
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
	.rule-body-section {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-top: var(--s100);
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
	.content-menu {
		position: absolute;
		top: var(--s300);
		left: 0;
		right: 0;
		padding: var(--s100);
		margin-bottom: var(--s150);
		margin-top: var(--s50);
	}
	.no-results {
		padding-left: 10vw;
		padding-top: 2vh;
	}
</style>
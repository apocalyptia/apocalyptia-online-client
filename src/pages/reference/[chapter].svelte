<script>
	import BackButton from '../../views/widgets/BackButton.svelte'
	import RefPageBody from '../../views/reference/RefPageBody.svelte'
	import Reference from '../../rules/Reference'
	import { beforeUpdate } from 'svelte'

	export let chapter

	let rules = Reference.filter(r => r.name.toLowerCase() == chapter)[0]

	rules.list = rules.list.sort((a, b) => (a.name > b.name))

	let ruleList = [...rules.list]

	$: searchTerm = ''

	beforeUpdate(_ => {
		ruleList = [...rules.list]
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
	<title>Apocalyptia Online - Reference - {rules.name}</title>
</svelte:head>
<div class='ref-header-section'>
	<div class='rules-name'>
		{rules.name}
	</div>
	<input type='text'
		class='search-bar'
		placeholder='Search'
		bind:value='{searchTerm}'
	/>
</div>
<div class='ref-page-body'>
	<RefPageBody {rules} {ruleList} />
</div>
<BackButton path={'/reference'} />


<style>
	.ref-header-section {
		display: block;
		position: fixed;
	}
		.rules-name {
			font-size: var(--s150);
			font-weight: bold;
			left: var(--s100);
			position: absolute;
			top: var(--s150);
		}
		.search-bar {
			min-width: 100px;
			padding: var(--s25) var(--s100);
			position: absolute;
			right: var(--s100);
			text-align: left;
			top: var(--s100);
			width: 33%;
		}
	.ref-page-body {
		top: var(--s300);
	}
</style>
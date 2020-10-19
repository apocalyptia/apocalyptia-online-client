<script>
	import BackButton from 'views/widgets/BackButton.svelte'
	import ManPageBody from 'views/manual/ManPageBody.svelte'
	import Manual from 'rules/Manual.js'
	import { beforeUpdate } from 'svelte'

	export let chapter

	let rules = Manual.filter(r => r.name.toLowerCase() == chapter)[0]

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
	<title>Apocalyptia Online - Manual - {rules.name}</title>
</svelte:head>
<div class='man-header-section'>
	<div class='rules-name'>
		{rules.name}
	</div>
	<input type='text'
		class='search-bar'
		placeholder='Search'
		bind:value='{searchTerm}'
	/>
</div>
<div class='man-page-body'>
	<ManPageBody {rules} {ruleList} />
</div>
<BackButton path={'/manual'} />


<style>
	.man-header-section {
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
	.man-page-body {
		position: absolute;
		top: var(--s300);
		left: 0;
		right: 0;
	}
</style>
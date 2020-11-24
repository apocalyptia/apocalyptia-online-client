<script>
	import BackButton from 'icons/BackButton.svelte'
	import ManualHeader from 'views/manual/ManualHeader.svelte'
	import ManualList from 'lists/ManualList.js'
	import ManualBody from 'views/manual/ManualBody.svelte'

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
{#if searchTerm === ''}
	<div class='manual-page-body'>
		{#each ManualList as chapter}
			<a href={`/manual/player/${chapter.name.toLowerCase()}`}
				class='link-btn menu-btn'
			>
				{chapter.name}
			</a>
		{/each}
	</div>
{:else}
	<ManualBody {ruleList} />
{/if}
<BackButton path={'/'} />
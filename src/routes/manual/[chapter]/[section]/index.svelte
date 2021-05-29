<script context='module'>
	export async function load({ page }) {
		const { chapter, section } = page.params
		return {
			props: {
				chapter,
				section
			}
		}
	}
</script>


<script>
	import ManualRuleArticle from '/src/components/manual/ManualRuleArticle.svelte'
	import Rules from '/src/rules/Rules.js'
	import urlFormat from '/src/utils/text/urlFormat.js'

	export let chapter, section
</script>


<div class='page-body' context='module'>
	{#if chapter === 'gear'}
		{#each Object.values(Rules[chapter][section]) as item}
			<div class='manual-btn'>
				<a href={urlFormat(`/manual/${chapter}/${section}/${item.name}`)} class='link-btn'>
					{item.name}
				</a>
			</div>
		{/each}
	{:else}
		<ManualRuleArticle rule={Rules[chapter][section]} />
	{/if}
</div>
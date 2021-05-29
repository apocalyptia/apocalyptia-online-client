<script context='module'>
	export async function load({ page }) {
		const { chapter, section, item } = page.params
		return {
			props: {
				chapter,
				section,
				item
			}
		}
	}
</script>


<script>
	import ManualRuleArticle from '/src/components/manual/ManualRuleArticle.svelte'
	import Rules from '/src/rules/Rules.js'
	import urlFormat from '/src/utils/text/urlFormat.js'

	export let chapter, section, item

	const rule = Rules[chapter][section][item]
</script>


{#if rule.type === 'Ammo'}
	{#each Object.values(Rules[chapter][section][item]) as type}
		<div class='manual-btn'>
			<a href={urlFormat(`/manual/${chapter}/${section}/${item.name}/${type.name}`)} class='link-btn'>
				{type.name}
			</a>
		</div>
	{/each}
{:else}
	<div class='page-body'>
		<ManualRuleArticle {rule} />
	</div>
{/if}
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

	export let chapter, section, item

	const rule = Rules[chapter][section][item]
</script>


<div class='page-body'>
	<ManualRuleArticle {rule} />
</div>
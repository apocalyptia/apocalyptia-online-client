<script context="module">
	export async function load({ params }) {
		const { chapter, section, item } = params
		return {
			props: {
				chapter,
				section,
				item,
			},
		}
	}
</script>


<script>
	import ManualArticle from '/src/components/manual/ManualArticle.svelte'
	import Rules from '/src/rules/Rules.js'
	import linkRuleDescriptions from '/src/utils/text/linkRuleDescriptions.js'

	export let chapter, section, item
</script>


<div class="page-body">
	<ManualArticle rule={linkRuleDescriptions(Rules[chapter][section][item])} />
</div>

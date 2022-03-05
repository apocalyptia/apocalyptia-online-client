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
	import ManualArticle from '$components/manual/ManualArticle.svelte'
	import Rules from '$rules/Rules.js'
	import linkRuleDescriptions from '$utils/text/linkRuleDescriptions.js'

	export let chapter, section, item
</script>


<div class="page-body">
	<ManualArticle rule={linkRuleDescriptions(Rules[chapter][section][item])} />
</div>

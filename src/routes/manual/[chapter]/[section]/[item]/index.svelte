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
	import ManualArticle from '/src/components/manual/ManualArticle.svelte'
	import Rules from '/src/rules/Rules.js'

	export let chapter, section, item
</script>

<div class='page-body'>
	<ManualArticle rule={Rules[chapter][section][item]} />
</div>

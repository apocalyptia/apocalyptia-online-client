<script context="module">
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

	const rule = Rules[chapter][section][item]

	console.log('chapter = ', chapter)
	console.log('section = ', section)
	console.log('item = ', item)
	console.log('Rules[chapter][section][item] = ', Rules[chapter][section][item])
</script>

<div class="page-body">
	<ManualArticle {rule} />
</div>

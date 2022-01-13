<script context="module">
	export async function load({ params }) {
		const { chapter } = params
		return {
			props: {
				chapter,
			},
		}
	}
</script>


<script>
	import ManualSearchbar from '/src/components/manual/ManualSearchbar.svelte'
	import ManualPage from '/src/components/manual/ManualPage.svelte'
	import Rules from '/src/rules/Rules.js'

	export let chapter
</script>


<ManualSearchbar />
<ManualPage list={Rules[chapter]} />

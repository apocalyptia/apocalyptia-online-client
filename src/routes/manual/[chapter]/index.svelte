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
	import ManualSearchbar from '$components/manual/ManualSearchbar.svelte'
	import ManualPage from '$components/manual/ManualPage.svelte'
	import Rules from '$rules/Rules.js'

	export let chapter
</script>


<ManualSearchbar />
<ManualPage list={Rules[chapter]} />

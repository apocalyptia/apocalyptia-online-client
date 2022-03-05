<script context="module">
	export async function load({ params }) {
		const { chapter, section } = params
		return {
			props: {
				chapter,
				section,
			},
		}
	}
</script>


<script>
	import ManualArticle from '$components/manual/ManualArticle.svelte'
	import ManualPage from '$components/manual/ManualPage.svelte'
	import ManualSearchbar from '$components/manual/ManualSearchbar.svelte'
	import Rules from '$rules/Rules.js'
	import linkRuleDescriptions from '$utils/text/linkRuleDescriptions.js'

	export let chapter, section
</script>


{#if chapter === 'gear'}
	<ManualSearchbar />
	<ManualPage list={Rules[chapter][section]} />
{:else}
	<div class="page-body">
		<ManualArticle rule={linkRuleDescriptions(Rules[chapter][section])} />
	</div>
{/if}

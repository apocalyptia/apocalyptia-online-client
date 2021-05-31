<script context="module">
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
	import ManualArticle from '/src/components/manual/ManualArticle.svelte'
	import ManualPage from '/src/components/manual/ManualPage.svelte'
	import ManualSearchbar from '/src/components/manual/ManualSearchbar.svelte'
	import Rules from '/src/rules/Rules.js'

	export let chapter, section
</script>


{#if chapter === 'gear'}
	<ManualSearchbar />
	<ManualPage list={Rules[chapter][section]} />
{:else}
	<div class='page-body'>
		<ManualArticle rule={Rules[chapter][section]} />
	</div>
{/if}
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
	import Rules from '/src/rules/Rules.js'
	import swapOrder from '/src/utils/text/swapOrder.js'
	import urlFormat from '/src/utils/text/urlFormat.js'

	export let chapter, section
</script>

<div class="page-body">
	{#if chapter === 'gear'}
		{#each Object.values(Rules[chapter][section]) as item}
			<div class="manual-btn">
				<a
					href={urlFormat(`/manual/${chapter}/${section}/${section === 'ammo' ? swapOrder(item.name) : item.name}`)}
					class="link-btn"
				>
					{item.name}
				</a>
			</div>
		{/each}
	{:else}
		<ManualArticle rule={Rules[chapter][section]} />
	{/if}
</div>

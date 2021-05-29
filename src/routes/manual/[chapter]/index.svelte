<script context='module'>
	export async function load({ page }) {
		const { chapter } = page.params
		return {
			props: {
				chapter
			}
		}
	}
</script>


<script>
	import Rules from '/src/rules/Rules.js'
	import capitalize from '/src/utils/text/capitalize.js'
	import urlFormat from '/src/utils/text/urlFormat.js'

	export let chapter
</script>


<div class='page-body'>
	{#each Object.keys(Rules[chapter]) as section}
		<div class='manual-btn'>
			{#if chapter === 'gear'}
				<a href={urlFormat(`/manual/${chapter}/${section}`)} class='link-btn'>
					{capitalize(section)}
				</a>
			{:else}
				<a href={urlFormat(`/manual/${chapter}/${section}`)} class='link-btn'>
					{Rules[chapter][section].name}
				</a>
			{/if}
		</div>
	{/each}
</div>
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
	import Capitalize from '/src/utils/text/Capitalize.js'
	import urlFormat from '/src/utils/text/urlFormat.js'

	export let chapter, section

	console.log('[chapter] chapter/section = ', chapter,'/',section)
</script>


<div class='page-body'>
	{#each Object.keys(Rules[chapter]) as section}
		<div class='manual-btn'>
			{#if chapter === 'gear'}
				<a href={urlFormat(`/manual/${chapter}/${section}`)} class='link-btn'>
					{Capitalize(section)}
				</a>
			{:else}
				<a href={urlFormat(`/manual/${chapter}/${section}`)} class='link-btn'>
					{Rules[chapter][section].name}
				</a>
			{/if}
		</div>
	{/each}
</div>
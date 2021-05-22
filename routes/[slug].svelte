<script context="module">
	export async function load({ page, fetch, session, context }) {
		const url = `/chapter/${page.params.slug}`
		const res = await fetch(url)

		if (res.ok) {
			return {
				props: {
					article: await res.json()
				}
			}
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		}
	}
</script>


<script>
	import ManualStore from '/src/stores/rulesStore.js'

	const { slug } = params

	console.log(slug)

	$: titles = null
</script>


<div class='page-body'>
	{#if titles === null}
		<p>Loading...</p>
	{:else}
		{#each titles as title}
			<div class='manual-btn'>
				<a href={`/manual/${title.toLowerCase()}`} class='link-btn'>{title}</a>
			</div>
		{/each}
	{/if}
</div>


<style>
	.manual-btn {
		margin-bottom: var(--std-margin);
	}
</style>
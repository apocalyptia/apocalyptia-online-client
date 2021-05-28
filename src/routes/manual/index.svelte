<script>
	import Capitalize from '/src/utils/text/Capitalize.js'
	import Rules from '/src/rules/Rules.js'

	console.log(Rules)
</script>


<div class='page-body'>
	{#each Object.keys(Rules.list) as chapter}
		<div class='manual-btn'>
			<a href={`/manual/${chapter}`} class='link-btn'>
				{Capitalize(chapter)}
			</a>
		</div>
	{/each}
</div>


<style>
	.manual-btn {
		margin-bottom: var(--std-margin);
	}
</style>
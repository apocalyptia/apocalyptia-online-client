<script >
	import Rules from '/src/rules/Rules.js'
	import capitalize from '/src/utils/text/capitalize.js'
	import urlFormat from '/src/utils/text/urlFormat.js'
</script>


<div class='page-body'>
	{#each Object.keys(Rules) as chapter}
		<div class='manual-btn'>
			<a href={urlFormat(`/manual/${chapter}`)} class='link-btn'>
				{capitalize(chapter)}
			</a>
		</div>
	{/each}
</div>
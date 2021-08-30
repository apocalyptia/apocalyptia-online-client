<script>
	// import linkTerms from '/src/utils/text/linkTerms.js'

	export let rule

	// rule.table.contents.forEach(row => {
	// 	row.penalty = linkTerms([row.penalty])[0]
	// 	row.effect = linkTerms([row.effect])[0]
	// })
</script>


<div class="rule-table">
	<table>
		<tr class="table-header">
			{#each rule.table.headers as header, h}
				<td style={`width: ${rule.table.widths[h]}ch;`}>
					{header}
				</td>
			{/each}
		</tr>
		{#each rule.table.contents as row, r}
			<tr>
				{#each Object.values(row) as col, c}
					<td class={col.toString().length === 1 ? 'center' : ''} style={`width: ${rule.table.widths[c]}ch;`}>
						{@html col}
					</td>
				{/each}
			</tr>
		{/each}
	</table>
</div>


<style>
	.rule-table {
		margin: var(--margin);
		overflow-x: scroll;
		border: 1px solid;
		display: flex;
		flex-direction: column;
	}
	.table-header {
		font-weight: bold;
		text-align: center;
	}
	.center {
		text-align: center;
	}
	table {
		min-width: 100%;
	}
	tr {
		width: max-content;
	}
</style>

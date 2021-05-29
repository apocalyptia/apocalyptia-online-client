<script>
	import { onMount } from 'svelte'

    export let rule

	let tableContents = []

	let columnWidths = []

	onMount(_ => {

	tableContents = [
		rule.table.headers,
		...Object.values(rule.table.contents).map(c => Object.values(c))
	]

	console.log(tableContents)

	columnWidths = new Array(rule.table.headers.length).fill(0)

	console.log(columnWidths)

	const offset = 4

	for (let r in tableContents) {
		for (let c in tableContents[r]) {
			if (columnWidths[c] < tableContents[r][c].toString().length) {
				columnWidths[c] = tableContents[r][c].toString().length + offset
				console.log(columnWidths)
			}
		}
	}
})
</script>


<div class='rule-table'>
    <table>
        <tr class='table-header'>
            {#each rule.table.headers as header, h}
                <td
					style={
						`
							width: ${columnWidths[h]}ch;
						`
					}
				>
					{header}
				</td>
            {/each}
        </tr>
        {#each rule.table.contents as row, r}
            <tr>
				{#each Object.values(row) as col, c}
					<td class={col.toString().length === 1 ? 'center' : ''}
						style={
							`
								width: ${columnWidths[c]}ch;
							`
						}
					>
						<!-- {columnWidths[i]} -->
						{col}
					</td>
				{/each}
            </tr>
        {/each}
    </table>
</div>


<style>
    .rule-table {
		margin: var(--std-margin);
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
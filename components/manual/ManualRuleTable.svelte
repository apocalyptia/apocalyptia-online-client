<script>
    export let rule
</script>


<div class='rule-table'>
    <table>
        <tr class='table-header'>
            {#each rule.table.headers as h, i}
                <td style='max-width: {rule.table.widths[i]}%; width: {rule.table.widths[i]}%;'>{h}</td>
            {/each}
        </tr>
        {#each rule.table.contents as c, i}
            <tr>
            {#each Object.values(c) as c, i}
                <td style='max-width: {rule.table.widths[i]}%; width: {rule.table.widths[i]}%;'>{c}</td>
            {/each}
            </tr>
        {/each}
    </table>
</div>


<style>
    .rule-table {
		margin: var(--std-margin);
	}
	.table-header {
		font-weight: bold;
		text-align: center;
	}
	tr {
		display: flex;
		width: 100%;
	}
	table {
		width: 100%;
	}
</style>
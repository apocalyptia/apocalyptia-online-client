<script>
export let item
</script>

<table>
	<tr>
		<td>Name: {item.name}</td>
	</tr>
	<tr>
		<td>Cal: {item.cal}</td>
		<td>Sz: {item.sz}</td>
		<td>Qty: {item.qty}</td>
	</tr>
	{#if item.attributes.length}
		<tr>
			<td>
				Attributes:
				{#each item.attributes as attr, index}
					{attr.name}{#if index < item.attributes.length - 1},&nbsp;{/if}
				{/each}
			</td>
		</tr>
	{/if}
</table>
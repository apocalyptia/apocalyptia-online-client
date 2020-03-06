<script>
export let item
</script>

<table>
	<tr>
		<td>Name: {item.name}</td>
	</tr>
	<tr>
		<td>Dr: {item.dr}</td>
		<td>Loc: {item.location}</td>
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
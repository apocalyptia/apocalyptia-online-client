<script>
export let item
</script>

<table>
	<tr>
		<td>Name: {item.name}</td>
	</tr>
	<tr>
		<td>Dmg: {item.dmg}</td>
		<td>Rng: {item.rng}</td>
		<td>Sz: {item.sz}</td>
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
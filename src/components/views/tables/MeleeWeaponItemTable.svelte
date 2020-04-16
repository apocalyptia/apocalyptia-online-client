<script>
export let item
</script>


{#if item != undefined}
<table>
	<tr>
		<td>{item.name}</td>
	</tr>
	<tr>
		<td>DMG: {item.dmg}</td>
		<td>RNG: {item.rng}</td>
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
{/if}
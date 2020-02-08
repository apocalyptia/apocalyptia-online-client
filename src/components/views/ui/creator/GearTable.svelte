<script>
	import Capitalize from '../../../helpers/Capitalize'

	export let item
	export let list
</script>


<table>
	<tr>
		<td>
			<span class='name-label'>Name: </span>
			{#if item}
				<span class='item-name'>{item.name}</span>
			{/if}
		</td>
	</tr>
	<tr>
		{#each list as l}
			<td>
				<span class='heading'>{Capitalize(l)}: </span>
				{#if item}
					<span class='content'>{item[l.toLowerCase()]}</span>
				{/if}
			</td>
		{/each}
	</tr>
	<tr>
		<td>
			<span class='attributes-label'>Attributes: </span>
			{#if item && item.attributes}
				<span class='attribute-list'>
					{#each item.attributes as attribute, index}
						{attribute.name}{#if index < item.attributes.length - 1},&nbsp;{/if}
					{/each}
				</span>
			{/if}
		</td>
		<td>
			<span class='size-label'>Size: </span>
			{#if item}
				<span class='item-size'>{item.sz}</span>
			{/if}
		</td>
	</tr>
</table>


<style>
	table {
		border-collapse: collapse;
		margin-bottom: 1rem;
		table-layout: fixed;
		text-align: left;
		width: 100%;
	}
	tr {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		align-items: start;
		align-content: center;
		height: 2.25rem;
	}
	td {
		flex: 1 0 auto;
	}
	.content {
		overflow-wrap: break-word;
	}
</style>
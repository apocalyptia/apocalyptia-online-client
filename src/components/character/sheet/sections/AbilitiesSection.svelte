<script>
	import characterStore from '/src/stores/characterStore.js'

	export const mode = 'readonly'
</script>

<div class="card-table">
	<div class="card-table-header">
		<span class="l-col">Name</span>
		<span class="s-col">XP</span>
		<span class="s-col">Max</span>
		<span class="s-col">Taken</span>
	</div>
	{#each $characterStore.abilities as ability}
		<div class="card-table-row">
			<span class="l-col">
				{ability.name}
				{ability.options[0] ? ` (${ability.options[0].name})` : ``}
			</span>
			<span class="s-col">{ability.experience}</span>
			<span class="s-col">{ability.max}</span>
			<span class="s-col">{ability.qty}</span>
		</div>
	{/each}
</div>

<style>
	.s-col {
		flex: 1;
		text-align: center;
	}
	.l-col {
		flex: 3;
		text-align: left;
	}
	.card-table {
		display: block;
	}
	.card-table-header,
	.card-table-row {
		align-items: baseline;
		display: flex;
		justify-content: space-between;
		margin: var(--std-margin);
	}
	.card-table-header {
		font-weight: bold;
		text-decoration: underline;
	}
</style>

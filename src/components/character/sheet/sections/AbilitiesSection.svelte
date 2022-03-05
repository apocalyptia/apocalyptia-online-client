<script>
	import characterStore from '$stores/characterStore.js'

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
				{ability.name}{ability.selectedOption ? ` (${ability.options[ability.selectedOption]})` : ``}
			</span>
			<span class="s-col">{ability.experience}</span>
			<span class="s-col">{ability.max}</span>
			<span class="s-col">{ability.quantity}</span>
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
		margin: var(--margin);
	}
	.card-table-header {
		font-weight: bold;
		text-decoration: underline;
	}
</style>

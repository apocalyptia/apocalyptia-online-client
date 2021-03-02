<script>
	import characterStore from 'stores/characterStore.js'
</script>


<details class='sheet-details' close>
	<summary class='sheet-card-title'>
		Abilities
	</summary>
	<div class='sheet-card'>
		<div class='card-table'>
			<div class='card-table-header'>
				<span class='l-col'>Name</span>
				<span class='s-col'>XP</span>
				<span class='s-col'>Max</span>
				<span class='s-col'>Taken</span>
			</div>
			{#each $characterStore.abilities as ability}
				<div class='card-table-row'>
					<span class='l-col'>{ability.name}{ability.opts[0] ? ` (${ability.opts[0].name})` : ``}</span>
					<span class='s-col'>{ability.experience}</span>
					<span class='s-col'>{ability.max}</span>
					<span class='s-col'>{ability.taken}</span>
				</div>
			{/each}
		</div>
	</div>
</details>


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
<script>
	import { character } from 'stores/characterStore.js'
</script>


<details class='sheet-details' close>
	<summary class='sheet-card-title'>
		Abilities
	</summary>
	<div class='sheet-card'>
		<div class='sheet-card-table'>
			<div class='sheet-card-table-header'>
				<span class='sheet-item-long-column'>Name</span>
				<span class='sheet-item-short-column'>XP</span>
				<span class='sheet-item-short-column'>Max</span>
				<span class='sheet-item-short-column'>Taken</span>
			</div>
			{#each $character.abilities as ability}
				<div class='sheet-card-table-row'>
					<span class='sheet-item-long-column'>
						{ability.name}{ability.opts[0] ? ` (${ability.opts[0].name})` : ``}
					</span>
					<span class='sheet-item-short-column'>
						{ability.xp}
					</span>
					<span class='sheet-item-short-column'>
						{ability.max}
					</span>
					<span class='sheet-item-short-column'>
						{ability.taken}
					</span>
				</div>
			{/each}
		</div>
	</div>
</details>
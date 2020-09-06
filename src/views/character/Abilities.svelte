<script>
	import { character } from '../../stores/characterStore'

	export let readonly
</script>


<details class='sheet-card' open>
	<summary class='sheet-card-title'>
		Abilities
	</summary>
	<div class='sheet-card-table'>
		<div class='sheet-card-table-header'>
			<span class='sheet-item-long-column'>Name</span>
			<span class='sheet-item-short-column'>XP</span>
			<span class='sheet-item-short-column'>Max</span>
			<span class='sheet-item-short-column'>Taken</span>
			<span class='sheet-item-short-column'/>
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
					{#if readonly}
						{ability.taken}
					{:else}
						<input type='number' 
							bind:value={ability.taken}
							min=0 max={ability.max}
						/>
					{/if}
				</span>
			</div>
		{/each}
		{#if !readonly}
			<div class='add-section'>
				<button class='add-button'>
					<div class='button-icon'>&#10010;</div>
				</button>
			</div>
		{/if}
	</div>
</details>
<script>
	import { character } from '../../stores/characterStore'
</script>


<details class='sheet-details' close>
	<summary class='sheet-card-title'>
		Traits
	</summary>
	<div class='sheet-card'>
		<div class='sheet-card-body'>
			{#each Object.values($character.traits) as trait}
				<div class='sheet-card-block'>
					<div class='sheet-card-item'>
						{trait.name}: {trait.score}
					</div>
				</div>
			{/each}
		</div>
	</div>
</details>
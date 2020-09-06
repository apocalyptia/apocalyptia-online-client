<script>
	import { character } from 'src/stores/characterStore'
</script>


<details class='sheet-card' open>
	<summary class='sheet-card-title'>
		Traits
	</summary>
	<div class='sheet-card-body'>
		{#each Object.values($character.traits) as trait}
			<div class='sheet-card-block'>
				<div class='sheet-card-item'>
					{trait.name}: {trait.score}
				</div>
			</div>
		{/each}
	</div>
</details>
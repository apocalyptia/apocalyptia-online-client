<script>
	import { character } from '../../stores/characterStore'
</script>


<details class='sheet-details' close>
	<summary class='sheet-card-title'>
		Skills
	</summary>
	<div class='sheet-card'>
		<div class='sheet-card-body'>
			{#each Object.values($character.traits) as trait}
				<div class='sheet-card-block'>
					{#each Object.values($character.skills) as skill}
						{#if trait.name == skill.parent}
							<div class='sheet-card-item'>
								{skill.name}: {skill.score}
							</div>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</div>
</details>
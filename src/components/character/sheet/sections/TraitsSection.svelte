<script>
	import characterStore from 'stores/characterStore.js'
</script>


<section>
	<details class='sheet-details'>
		<summary class='sheet-card-title'>
			Traits
		</summary>
		<div class='sheet-card'>
			<div class='sheet-card-body'>
				{#each Object.values($characterStore.traits) as trait}
					<div class='sheet-card-block'>
						<div class='sheet-card-item'>
							<span class='trait-name'>
								{trait.name}: {trait.score}
							</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</details>
</section>


<style>
	.trait-name {
		font-size: var(--s110);
		font-weight: bold;
	}
</style>
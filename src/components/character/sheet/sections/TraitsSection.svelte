<script>
	import characterStore from '/src/stores/characterStore.js'

	export const mode = 'readonly'
</script>


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


<style>
	.trait-name {
		font-size: var(--s110);
		font-weight: bold;
	}
</style>
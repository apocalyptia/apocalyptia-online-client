<script>
	import Properties from '/src/rules/Properties.js'
</script>

<details class="formulae-details">
	<summary>Properties Formulae</summary>
	<div class="formulae-card">
		<ul>
			{#each Object.values(Properties) as property}
				{#if property.name === 'Health'}
					<li>Health: {property.desc[0]}</li>
					<li>Health: {property.desc[1]}</li>
				{:else}
					<li>
						<h4>{property.name}</h4>
						= {property.formula}
					</li>
				{/if}
			{/each}
		</ul>
	</div>
</details>

<style>
	.formulae-details {
		margin: var(--std-margin) 0;
	}
	li {
		margin: var(--std-margin);
	}
</style>

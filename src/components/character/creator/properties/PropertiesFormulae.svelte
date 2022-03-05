<script>
	import Properties from '$rules/Properties.js'

	let isOpen = false
</script>

<details class="formulae-details" bind:open={isOpen}>
	<summary>
		<span>{isOpen ? '-' : '+'}</span>
		<h2>Properties Formulae</h2>
	</summary>
	<div class="formulae-card">
		<ul>
			{#each Object.values(Properties) as property}
				{#if property.name === 'Health'}
					<li>
						<h4>Health</h4>
						= {property.description[0]}, {property.description[1]}
					</li>
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
		margin: var(--margin) 0;
	}
	span {
		margin-right: var(--margin);
	}
	li {
		margin: var(--margin);
	}
</style>

<script>
	import PropertiesList from 'lists/PropertiesList.js'
</script>


<details class='formulae-details'>
	<summary>Properties Formulae</summary>
	<div class='formulae-card'>
		<ul>
			{#each PropertiesList.list as property}
				{#if property.name == 'Health'}
					<li>{property.desc[0]}</li>
					<li>{property.desc[1]}</li>
				{:else}
					<li>{property.desc[0]}</li>
				{/if}
			{/each}
		</ul>
	</div>
</details>


<style>
	.formulae-details {
		margin: var(--std-margin);
	}
	li {
		margin: var(--std-margin);
	}
</style>
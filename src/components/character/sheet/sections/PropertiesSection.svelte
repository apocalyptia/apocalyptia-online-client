<script>
	import PropertiesList from 'rules/lists/PropertiesList.js'
	import characterStore from 'stores/characterStore.js'

	export let mode = 'readonly'

	const propertyListHalves = [
		PropertiesList.list.slice(0, (PropertiesList.list.length / 2)),
		PropertiesList.list.slice(PropertiesList.list.length / 2, PropertiesList.list.length)
	]
</script>


<section>
	<details class='sheet-details' open>
		<summary class='sheet-card-title'>
			Properties
		</summary>
		<div class='sheet-card'>
			<div class='sheet-card-body'>
				{#each propertyListHalves as halfProp}
					<div class='sheet-card-block'>
						{#each halfProp as p}
							<div class='sheet-card-item'>
								{$characterStore.properties[p.name.toLowerCase()].name}: 
								{#if $characterStore.properties[p.name.toLowerCase()].hasOwnProperty('current')}
									{#if mode == 'readonly'}
										{$characterStore.properties[p.name.toLowerCase()].current}
									{:else}
										<input type='number'
											class='current-value'
											bind:value={$characterStore.properties[p.name.toLowerCase()].current}
											min=0 max={$characterStore.properties[p.name.toLowerCase()].score}
										/>
									{/if} / 
								{/if}
								{$characterStore.properties[p.name.toLowerCase()].score}
							</div>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</details>
</section>


<style>
	.current-value {
		width: 6ch;
	}
</style>
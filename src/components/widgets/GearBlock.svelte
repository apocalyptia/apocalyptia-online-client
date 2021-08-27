<script>
	export let mode, item

	const itemProps = [
		{
			name: 'Type',
			abv: 'type',
		},
		{
			name: 'Accuracy',
			abv: 'accuracy',
		},
		{
			name: 'Damage',
			abv: 'damage',
		},
		{
			name: 'Penetration',
			abv: 'penetration',
		},
		{
			name: 'Rate',
			abv: 'rate',
		},
		{
			name: 'Range',
			abv: 'range',
		},
		{
			name: 'Capacity',
			abv: 'capacity',
		},
		{
			name: 'Caliber',
			abv: 'caliber',
		},
		{
			name: 'Category',
			abv: 'category',
		},
		{
			name: 'Specialty',
			abv: 'specialty',
		},
		{
			name: 'Quantity',
			abv: 'quantity',
		},
		{
			name: 'Fuse',
			abv: 'fuse',
		},
		{
			name: 'Duration',
			abv: 'duration',
		},
		{
			name: 'Mix Difficulty',
			abv: 'mix',
		},
		{
			name: 'Overdose Possible',
			abv: 'overdose',
		},
		{
			name: 'Slots',
			abv: 'slots',
		},
		{
			name: 'Absorption',
			abv: 'absorption',
		},
		{
			name: 'Location',
			abv: 'location',
		},
		{
			name: 'Size',
			abv: 'size',
		},
	]
</script>

<div class="gear-block">
	{#if item}
		{#if mode != 'manual'}
			<h4 class="item-name">{item.name}</h4>
		{/if}
		<div class="item-details">
			{#if item.description}
				{#each item.description as description}
					<p class="gear-description">{description}</p>
				{/each}
			{/if}
			{#each itemProps as prop}
				{#if item[prop.abv] != undefined && item[prop.abv].toString().length}
					<p class="gear-prop">
						{#if prop.name === 'Quantity'}
							{#if mode === 'edit'}
								<span class="prop-name">{prop.name}</span>:
								<input type="number" class="item-quantity" min="0" bind:value={item.quantity} />
							{:else if mode === 'readonly' && item.type === 'Ammo'}
								<span class="prop-name">{prop.name}</span>:
								<span type="number" class="item-quantity">{item.quantity}</span>
							{/if}
						{:else}
							<span class="prop-name">{prop.name}</span>:
							{item[prop.abv]}
						{/if}
					</p>
				{/if}
			{/each}
			{#if item && item.hasOwnProperty('attributes') && item.attributes.length > 0}
				<p class="gear-attributes"><u>Attributes</u>:</p>
				<div class="attributes">
					{#each item.attributes as attributes}
						<div class="attributes-type">
							{attributes.name}:
							{#each attributes.description as line}
								<p class="attributes-description">{line}</p>
							{/each}
						</div>
					{/each}
				</div>
			{/if}
			{#if item.table}
				<svelte:component this={item.table} />
			{/if}
		</div>
	{/if}
</div>

<style>
	.item-name {
		font-weight: bold;
		padding-left: var(--padding);
		text-decoration: underline;
	}
	.gear-description,
	.gear-prop,
	.gear-attributes,
	.attributes-type {
		margin: var(--margin);
	}
	.prop-name {
		text-decoration: underline;
	}
	.attributes-type {
		padding-left: var(--padding);
	}
	.attributes-description {
		padding-left: calc(var(--padding) * 2);
	}
	.item-quantity {
		width: 20%;
	}
</style>

<script>
	export let mode, item

	const itemProps = [
		{
			name: 'Type',
			abv: 'type'
		},
		{
			name: 'Damage',
			abv: 'dmg'
		},
		{
			name: 'Range',
			abv: 'rng'
		},
		{
			name: 'Magazine',
			abv: 'cap'
		},
		{
			name: 'Caliber',
			abv: 'cal'
		},
		{
			name: 'Quantity',
			abv: 'qty'
		},
		{
			name: 'Fuse',
			abv: 'fuse'
		},
		{
			name: 'Duration',
			abv: 'dur'
		},
		{
			name: 'Mix Difficulty',
			abv: 'mix'
		},
		{
			name: 'Overdose Possible',
			abv: 'od'
		},
		{
			name: 'Hours',
			abv: 'hrs'
		},
		{
			name: 'Slots',
			abv: 'slots'
		},
		{
			name: 'Damage Resistance',
			abv: 'dr'
		},
		{
			name: 'Body Part',
			abv: 'loc'
		},
		{
			name: 'Size',
			abv: 'sz'
		},
	]
</script>


<div class='gear-block'>
	{#if item}
		{#if mode != 'manual'}
			<p class='item-name'>{item.name}</p>
		{/if}
		<div class='item-details {mode == "manual" ? "extra-padding" : ""}'>
			{#if item.desc}
				{#each item.desc as desc}
					<p class='gear-desc'>{desc}</p>
				{/each}
			{/if}
			{#each itemProps as prop}
				{#if item[prop.abv] != undefined}
					<p class='gear-prop'>
						{#if prop.name == 'Quantity'}
							{#if mode == 'edit'}
								<span class='prop-name'>{prop.name}</span>: 
								<input type='number'
									class='item-qty'
									min='0'
									bind:value={item.qty}
								/>
							{/if}
						{:else}
							<span class='prop-name'>{prop.name}</span>: 
							{item[prop.abv]}
						{/if}
					</p>
				{/if}
			{/each}
			{#if item && item.hasOwnProperty('attr') && item.attr.length > 0}
				<p class='gear-attr'><u>Attributes</u>:</p>
				<div class='attributes'>
					{#each item.attr as attr}
						<div class='attr-type'>
							{attr.name}:
							{#each attr.desc as line}
								<p class='attr-desc'>{line}</p>
							{/each}
						</div>
					{/each}
				</div>
			{/if}
			{#if item.table}
				<svelte:component this={item.table}/>
			{/if}
		</div>
	{/if}
</div>


<style>
	.item-name {
		font-weight: bold;
		text-decoration: underline;
	}
	.gear-desc,
	.gear-prop,
	.gear-attr,
	.attr-type {
		padding-top: var(--std-padding);
	}
	.prop-name {
		text-decoration: underline;
	}
	.attr-type {
		padding-left: var(--std-padding);
	}
	.attr-desc {
		padding-left: calc(var(--std-padding) * 2);
	}
	.item-qty {
		width: 20%;
	}
	.extra-padding {
		padding: var(--std-padding);
	}
</style>
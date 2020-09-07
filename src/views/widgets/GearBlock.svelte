<script>
	export let mode, item
</script>


<div class='gear-block'>
	{#if item != null}
		{#if item.name != null}
			<p><strong>{item.name}</strong></p>
		{/if}
		{#if item.desc != null}
			{#each item.desc as desc}
				<p>{desc}</p>
			{/each}
		{/if}
		{#if item.dmg != null}
			<p><u>Damage</u>: {item.dmg}</p>
		{/if}
		{#if item.rng != null}
			<p><u>Range</u>: {item.rng}</p>
		{/if}
		{#if item.cap != null}
			<p><u>Magazine</u>: {item.cap}</p>
		{/if}
		{#if item.cal != null}
			<p><u>Caliber</u>: {item.cal}</p>
		{/if}
		{#if item.qty != null && mode != 'reference'}
			<p>
				<u>Quantity</u>: 
				{#if mode == 'readonly'}
					{item.qty}
				{:else if mode == 'edit'}
					<input type='number' class='item-qty' min='0' bind:value={item.qty} />
				{/if}
			</p>
		{/if}
		{#if item.fuse != null}
			<p><u>Fuse</u>: {item.fuse}</p>
		{/if}
		{#if item.dur != null}
			<p><u>Duration</u>: {item.dur}</p>
		{/if}
		{#if item.mix != null}
			<p><u>Mix Difficulty</u>: {item.mix}#</p>
		{/if}
		{#if item.od != null}
			<p><u>Overdose Possible</u>: {item.od.toString()}</p>
		{/if}
		{#if item.hrs != null}
			<p><u>Hours</u>: {item.hrs}</p>
		{/if}
		{#if item.slots != null}
			<p><u>Slots</u>: {item.slots}</p>
		{/if}
		{#if item.dr != null}
			<p><u>Damage Resistance</u>: {item.dr}</p>
		{/if}
		{#if item.loc != null}
			<p><u>Body Part</u>: {item.loc}</p>
		{/if}
		{#if item != null && item.hasOwnProperty('attr') && item.attr.length > 0}
			<p><u>Attributes</u>:</p>
			<div class='attributes'>
				<ul>
					{#each item.attr as attr}
						<li>{attr.name}:{#each attr.desc as line}
											&nbsp;{line}
										{/each}
						</li>
					{/each}
				</ul>
			</div>
		{/if}
		{#if item.sz != null}
			<p><u>Size</u>: {item.sz}</p>
		{/if}
		{#if item.table != null}
			<svelte:component this={item.table}/>
		{/if}
	{/if}
</div>


<style>
	strong {
		font-weight: bold;
	}
	ul {
		list-style: disc;
		margin-left: var(--s100);
	}
	.item-qty {
		width: 20%;
	}
</style>
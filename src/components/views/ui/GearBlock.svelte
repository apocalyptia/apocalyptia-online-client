<script>
	export let rule
	export let readonly
</script>


<div class='gear-block'>
	{#if rule != null}
		{#if rule.name != null}
			<p><strong>{rule.name}</strong></p>
		{/if}
		{#if rule.desc != null}
			{#each rule.desc as desc}
				<p>{desc}</p>
			{/each}
		{/if}
		{#if rule.dmg != null}
			<p><u>Damage</u>: {rule.dmg}</p>
		{/if}
		{#if rule.rng != null}
			<p><u>Range</u>: {rule.rng}</p>
		{/if}
		{#if rule.cap != null}
			<p><u>Magazine</u>: {rule.cap}</p>
		{/if}
		{#if rule.cal != null}
			<p><u>Caliber</u>: {rule.cal}</p>
		{/if}
		{#if rule.qty != null}
			<p>
				<u>Quantity</u>: 
				{#if readonly}
					{rule.qty}
				{:else}
					<input type='number' class='ammo-qty' min='0' bind:value={rule.qty} />
				{/if}
			</p>
		{/if}
		{#if rule.fuse != null}
			<p><u>Fuse</u>: {rule.fuse}</p>
		{/if}
		{#if rule.dur != null}
			<p><u>Duration</u>: {rule.dur}</p>
		{/if}
		{#if rule.mix != null}
			<p><u>Mix Difficulty</u>: {rule.mix}#</p>
		{/if}
		{#if rule.od != null}
			<p><u>Overdose Possible</u>: {rule.od.toString()}</p>
		{/if}
		{#if rule.hrs != null}
			<p><u>Hours</u>: {rule.hrs}</p>
		{/if}
		{#if rule.slots != null}
			<p><u>Slots</u>: {rule.slots}</p>
		{/if}
		{#if rule.dr != null}
			<p><u>Damage Resistance</u>: {rule.dr}</p>
		{/if}
		{#if rule.loc != null}
			<p><u>Body Part</u>: {rule.loc}</p>
		{/if}
		{#if rule != null && rule.hasOwnProperty('attr') && rule.attr.length > 0}
			<p><u>Attributes</u>:</p>
			<div class='attributes'>
				<ul>
					{#each rule.attr as attr}
						<li>{attr.name}:{#each attr.desc as line}
											&nbsp;{line}
										{/each}
						</li>
					{/each}
				</ul>
			</div>
		{/if}
		{#if rule.sz != null}
			<p><u>Size</u>: {rule.sz}</p>
		{/if}
		{#if rule.table != null}
			<svelte:component this={rule.table}/>
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
</style>
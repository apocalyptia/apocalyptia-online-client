<script>
export let rule
</script>


<div>
	{#if rule != undefined}
		{#if rule.description != undefined}
			{#each rule.description as desc}
				<p>{desc}</p>
			{/each}
		{/if}
		{#if rule.dmg != undefined}<p><u>Damage</u>: {rule.dmg}</p>{/if}
		{#if rule.rng != undefined}<p><u>Range</u>: {rule.rng}</p>{/if}
		{#if rule.mag != undefined}<p><u>Magazine</u>: {rule.mag}</p>{/if}
		{#if rule.cal != undefined}<p><u>Caliber</u>: {rule.cal}</p>{/if}
		{#if rule.fuse != undefined}<p><u>Fuse</u>: {rule.fuse}</p>{/if}
		{#if rule.duration != undefined}<p><u>Duration</u>: {rule.duration}</p>{/if}
		{#if rule.mix != undefined}<p><u>Mix Difficulty</u>: {rule.mix}#</p>{/if}
		{#if rule.overdose != undefined}<p><u>Overdose Possible</u>: {rule.overdose.toString()}</p>{/if}
		{#if rule.hours != undefined}<p><u>Hours</u>: {rule.hours}</p>{/if}
		{#if rule.slots != undefined}<p><u>Slots</u>: {rule.slots}</p>{/if}
		{#if rule.dr != undefined}<p><u>Damage Resistance</u>: {rule.dr}</p>{/if}
		{#if rule.location != undefined}<p><u>Location</u>: {rule.location}</p>{/if}
		{#if rule != undefined && rule.hasOwnProperty('attributes') && rule.attributes.length > 0}
			<u>Attributes</u>:
			<div class='attributes'>
				<ul>
				{#each rule.attributes as attribute, i}
					<li>{attribute.name}: {attribute.description}</li>
				{/each}
				</ul>
			</div>
		{/if}
		{#if rule.sz != undefined}<p><u>Size</u>: {rule.sz}</p>{/if}
		{#if rule.table != undefined}<svelte:component this={rule.table}/>{/if}
	{/if}
</div>


<style>
ul {
	list-style: disc;
	margin-left: var(--s100);
}
</style>
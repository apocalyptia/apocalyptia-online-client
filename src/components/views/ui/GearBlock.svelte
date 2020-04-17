<script>
export let rule

const gearProps = [
	'desc',
	'dmg',
	'rng',
	'cap',
	'cal',
	'fuse',
	'dur',
	'mix',
	'od',
	'hrs',
	'slots',
	'dr',
	'loc',
	'attr',
	'sz',
	'table'
]
</script>


<div>
	{#if rule != undefined}
		{#if rule.desc != undefined}
			{#each rule.desc as desc}
				<p>{desc}</p>
			{/each}
		{/if}
		{#if rule.dmg != undefined}
			<p><u>Damage</u>: {rule.dmg}</p>
		{/if}
		{#if rule.rng != undefined}
			<p><u>Range</u>: {rule.rng}</p>
		{/if}
		{#if rule.cap != undefined}<p><u>Magazine</u>: {rule.cap}</p>{/if}
		{#if rule.cal != undefined}<p><u>Caliber</u>: {rule.cal}</p>{/if}
		{#if rule.fuse != undefined}<p><u>Fuse</u>: {rule.fuse}</p>{/if}
		{#if rule.dur != undefined}<p><u>Duration</u>: {rule.dur}</p>{/if}
		{#if rule.mix != undefined}<p><u>Mix Difficulty</u>: {rule.mix}#</p>{/if}
		{#if rule.od != undefined}<p><u>Overdose Possible</u>: {rule.od.toString()}</p>{/if}
		{#if rule.hrs != undefined}<p><u>Hours</u>: {rule.hrs}</p>{/if}
		{#if rule.slots != undefined}<p><u>Slots</u>: {rule.slots}</p>{/if}
		{#if rule.dr != undefined}<p><u>Damage Resistance</u>: {rule.dr}</p>{/if}
		{#if rule.loc != undefined}<p><u>Location</u>: {rule.loc}</p>{/if}
		{#if rule != undefined && rule.hasOwnProperty('attr') && rule.attr.length > 0}
			<u>Attributes</u>:
			<div class='attributes'>
				<ul>
				{#each rule.attr as attr, i}
					<li>{attr.name}: {attr.desc}</li>
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
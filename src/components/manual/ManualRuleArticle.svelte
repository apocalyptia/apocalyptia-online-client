<script>
	import Gear from '/src/classes/Gear.js'
	import GearBlock from '/src/components/widgets/GearBlock.svelte'
	import Disease from '/src/classes/Disease.js'
	import ManualDiseaseRule from '/src/components/manual/ManualDiseaseRule.svelte'
	import ManualRuleDescription from '/src/components/manual/ManualRuleDescription.svelte'
	import ManualRuleSpecialization from '/src/components/manual/ManualRuleSpecialization.svelte'
	import ManualRuleTable from '/src/components/manual/ManualRuleTable.svelte'
	import ManualSubRule from '/src/components/manual/ManualSubRule.svelte'

	export let rule
</script>


<article class='rule-body'>
	<h1>{rule.name}</h1>
	{#if rule instanceof Gear }
		<div class='gear-rule'>
			<GearBlock item={rule} mode={'manual'} />
		</div>
	{:else if rule instanceof Disease}
		<ManualDiseaseRule {rule} />
	{:else if rule.desc != undefined}
		<ManualRuleDescription {rule} />
		{#if rule.subrules}
			{#each rule.subrules as subrule}
				<ManualSubRule {subrule} />
			{/each}
		{/if}
		{#if rule.table != undefined}
			<ManualRuleTable {rule} />
		{/if}
		{#if rule.specs}
			<ManualRuleSpecialization {rule} />
		{/if}
	{/if}
</article>
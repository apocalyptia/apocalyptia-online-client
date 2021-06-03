<script>
	import Gear from '/src/classes/Gear.js'
	import GearBlock from '/src/components/widgets/GearBlock.svelte'
	import Disease from '/src/classes/Disease.js'
	import ManualDisease from '/src/components/manual/ManualDisease.svelte'
	import ManualDescription from '/src/components/manual/ManualDescription.svelte'
	import ManualSpecialization from '/src/components/manual/ManualSpecialization.svelte'
	import ManualTable from '/src/components/manual/ManualTable.svelte'
	import ManualSubRule from '/src/components/manual/ManualSubRule.svelte'

	export let rule
</script>

<div class='section-card'>
	<article class='rule-body'>
		<h1>{rule.name}</h1>
		{#if rule instanceof Gear}
			<div class='gear-rule'>
				<GearBlock item={rule} mode={'manual'} />
			</div>
		{:else if rule instanceof Disease}
			<ManualDisease {rule} />
		{:else if rule.desc != undefined}
			<ManualDescription {rule} />
			{#if rule.subrules}
				{#each rule.subrules as subrule}
					<ManualSubRule {subrule} />
				{/each}
			{/if}
			{#if rule.table != undefined}
				<ManualTable {rule} />
			{/if}
			{#if rule.specs}
				<ManualSpecialization {rule} />
			{/if}
		{/if}
	</article>
</div>

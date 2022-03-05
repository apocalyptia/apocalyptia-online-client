<script>
	import CenterCard from '$components/widgets/CenterCard.svelte'
	import Disease from '$classes/Disease.js'
	import Gear from '$classes/Gear.js'
	import GearBlock from '$components/widgets/GearBlock.svelte'
	import ManualDescription from '$components/manual/ManualDescription.svelte'
	import ManualDisease from '$components/manual/ManualDisease.svelte'
	import ManualSpecialization from '$components/manual/ManualSpecialization.svelte'
	import ManualTable from '$components/manual/ManualTable.svelte'

	export let rule
</script>


<CenterCard title={rule.name}>
	<article class="rule-body">
		<h1>{rule.name}</h1>
		{#if rule instanceof Gear}
			<div class="gear-rule">
				<GearBlock item={rule} mode={'manual'} />
			</div>
		{:else if rule instanceof Disease}
			<ManualDisease {rule} />
		{:else if rule.description}
			<ManualDescription {rule} />
			{#if rule.table}
				<ManualTable {rule} />
			{/if}
			{#if rule.specialties}
				<ManualSpecialization {rule} />
			{/if}
		{/if}
	</article>
</CenterCard>


<style>
	.rule-body {
		text-align: left;
	}
</style>
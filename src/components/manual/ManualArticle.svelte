<script>
	import Gear from '/src/classes/Gear.js'
	import GearBlock from '/src/components/widgets/GearBlock.svelte'
	import Disease from '/src/classes/Disease.js'
	import ManualDisease from '/src/components/manual/ManualDisease.svelte'
	import ManualDescription from '/src/components/manual/ManualDescription.svelte'
	import ManualSpecialization from '/src/components/manual/ManualSpecialization.svelte'
	import ManualTable from '/src/components/manual/ManualTable.svelte'
	import linkTerms from '/src/utils/text/linkTerms.js'
	import { onMount } from 'svelte'

	export let rule

	onMount(() => {
		if (rule.description) {
			rule.description = linkTerms(rule.description)
		}
		if (rule.specialties) {
			for (let specialty of Object.values(rule.specialties)) {
				specialty.description = linkTerms(specialty.description)
			}
		}
	})
</script>


<div class="section-card">
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
</div>

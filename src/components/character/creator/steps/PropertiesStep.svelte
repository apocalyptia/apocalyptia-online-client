<script>
	import HealthSection from '/src/components/character/sheet/sections/HealthSection.svelte'
	import ExplanationBlock from '/src/components/character/creator/ExplanationBlock.svelte'
	import PageHeader from '/src/components/character/creator/PageHeader.svelte'
	import Properties from '/src/rules/Properties.js'
	import PropertiesBlock from '/src/components/character/creator/properties/PropertiesBlock.svelte'
	import PropertiesFormulae from '/src/components/character/creator/properties/PropertiesFormulae.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import { onMount } from 'svelte'

	onMount(_ => {
		$characterStore.updateProperties($characterStore)
		$characterStore.resetHealth($characterStore)
		$characterStore = $characterStore
	})
</script>


<div class='properties-step-page'>
	<PageHeader chapter={'Properties'} step={$characterStore.meta.step} />
	<ExplanationBlock rule={Properties} />
	<PropertiesFormulae />
	<PropertiesBlock />
	<div class='section-card'>
		<HealthSection mode={'readonly'} />
	</div>
</div>
<script>
	import HealthSection from 'components/character/sheet/sections/HealthSection.svelte'
	import ExplanationBlock from 'components/character/creator/ExplanationBlock.svelte'
	import PageHeader from 'components/character/creator/PageHeader.svelte'
	import Properties from 'rules/Properties.js'
	import PropertiesBlock from 'components/character/creator/properties/PropertiesBlock.svelte'
	import PropertiesFormulae from 'components/character/creator/properties/PropertiesFormulae.svelte'
	import characterStore from 'stores/characterStore.js'
	import { onMount } from 'svelte'

	onMount(_ => {
		$characterStore.updateProperties($characterStore)
		$characterStore.resetHealth($characterStore)
		$characterStore = $characterStore
		$characterStore.save()
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
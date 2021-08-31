<script>
	import CreationProcess from '/src/rules/CreationProcess.js'
	import ExplanationBlock from '/src/components/character/creator/ExplanationBlock.svelte'
	import HealthProperty from '/src/components/character/creator/properties/HealthProperty.svelte'
	import PageHeader from '/src/components/character/creator/PageHeader.svelte'
	import PropertiesBlock from '/src/components/character/creator/properties/PropertiesBlock.svelte'
	import PropertiesFormulae from '/src/components/character/creator/properties/PropertiesFormulae.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import creationStore from '/src/stores/creationStore.js'
	import { onMount } from 'svelte'

	onMount(() => {
		$characterStore.updateProperties()
		$characterStore = $characterStore
	})
</script>


<div class="properties-step-page">
	<fieldset>
		<PageHeader chapter={'Properties'} step={$creationStore.step} />
		<ExplanationBlock rule={CreationProcess.properties.description} />
		<PropertiesBlock />
		<PropertiesFormulae />
		<HealthProperty />
	</fieldset>
</div>

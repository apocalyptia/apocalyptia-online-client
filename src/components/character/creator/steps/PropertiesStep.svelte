<script>
	import CreationProcess from '$rules/CreationProcess.js'
	import ExplanationBlock from '$components/character/creator/ExplanationBlock.svelte'
	import HealthProperty from '$components/character/creator/properties/HealthProperty.svelte'
	import PageHeader from '$components/character/creator/PageHeader.svelte'
	import PropertiesBlock from '$components/character/creator/properties/PropertiesBlock.svelte'
	import PropertiesFormulae from '$components/character/creator/properties/PropertiesFormulae.svelte'
	import characterStore from '$stores/characterStore.js'
	import { onMount } from 'svelte'

	onMount(() => $characterStore = $characterStore.updateProperties())
</script>


<div class="properties-step-page">
	<fieldset>
		<PageHeader chapter={'Properties'} />
		<ExplanationBlock rule={CreationProcess.properties.description} />
		<PropertiesBlock />
		<PropertiesFormulae />
		<HealthProperty />
	</fieldset>
</div>

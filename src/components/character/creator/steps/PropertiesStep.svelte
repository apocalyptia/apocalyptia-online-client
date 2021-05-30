<script>
	import Creation from '/src/rules/Creation.js'
	import ExplanationBlock from '/src/components/character/creator/ExplanationBlock.svelte'
	import HealthSection from '/src/components/character/sheet/sections/HealthSection.svelte'
	import PageHeader from '/src/components/character/creator/PageHeader.svelte'
	import PropertiesBlock from '/src/components/character/creator/properties/PropertiesBlock.svelte'
	import PropertiesFormulae from '/src/components/character/creator/properties/PropertiesFormulae.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import { onMount } from 'svelte'

	onMount(() => {
		$characterStore.updateProperties()
		$characterStore = $characterStore
	})
</script>

<div class="properties-step-page">
	<fieldset>
		<PageHeader chapter={'Properties'} step={$characterStore.step} />
		<ExplanationBlock rule={Creation.properties.desc} />
		<PropertiesBlock />
		<PropertiesFormulae />
		<div class="section-card">
			<h2>Health</h2>
			<HealthSection mode={'readonly'} />
		</div>
	</fieldset>
</div>

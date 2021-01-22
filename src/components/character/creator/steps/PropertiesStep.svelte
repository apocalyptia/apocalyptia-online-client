<script>
	import BodyParts from '$components/character/BodyParts.svelte'
	import Creation from '$rules/Creation.js'
	import ExplanationBlock from '$components/character/creator/ExplanationBlock.svelte'
	import PageHeader from '$components/character/creator/PageHeader.svelte'
	import PropertiesBlock from '$components/character/creator/properties/PropertiesBlock.svelte'
	import PropertiesFormulae from '$components/character/creator/properties/PropertiesFormulae.svelte'
	import Properties from '$rules/Properties.js'
	import { beforeUpdate } from 'svelte'
	import characterStore from '$stores/characterStore.js'

	beforeUpdate(_ => $characterStore = Creation.setProperties($characterStore))
</script>


<div class='properties-step-page'>
	<PageHeader chapter={'Properties'} step={$characterStore.meta.step} />
	<ExplanationBlock rule={Properties} />
	<PropertiesFormulae />
	<PropertiesBlock />
	<div class='section-card'>
		<BodyParts mode={'readonly'} />
	</div>
</div>
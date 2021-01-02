<script>
	import BodyParts from 'views/character/BodyParts.svelte'
	import Creation from 'rules/Creation.js'
	import ExplanationBlock from 'views/character/creator/ExplanationBlock.svelte'
	import PageHeader from 'views/character/creator/PageHeader.svelte'
	import PropertiesBlock from 'views/character/creator/PropertiesBlock.svelte'
	import PropertiesFormulae from 'views/character/creator/PropertiesFormulae.svelte'
	import Properties from 'rules/Properties.js'
	import { beforeUpdate } from 'svelte'
	import { characterStore } from 'stores/characterStore.js'

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
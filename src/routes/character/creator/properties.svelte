<script>
	import BodyParts from 'views/character/BodyParts.svelte'
	import ExplanationBlock from 'views/character/creator/ExplanationBlock.svelte'
	import PageHeader from 'views/character/creator/PageHeader.svelte'
	import PropertiesBlock from 'views/character/creator/PropertiesBlock.svelte'
	import PropertiesFormulae from 'views/character/creator/PropertiesFormulae.svelte'
	import Properties from 'rules/Properties.js'
	import { beforeUpdate } from 'svelte'
	import { character } from 'stores/characterStore.js'

	export let creator

	beforeUpdate(_ => $character = $character.setProperties())
</script>


<PageHeader {creator} step={$character.meta.step} />
<ExplanationBlock rule={Properties} />
<PropertiesFormulae />
<PropertiesBlock />
<div class='section-card'>
	<BodyParts {character} mode={'readonly'} />
</div>
<script>
	import BodyParts from 'views/character/BodyParts.svelte'
	import ExplanationBlock from 'views/character/creator/ExplanationBlock.svelte'
	import Properties from 'rules/Properties.js'
	import PropertiesList from 'lists/PropertiesList.js'
	import { beforeUpdate } from 'svelte'
	import { character } from 'stores/characterStore.js'

	beforeUpdate(_ => $character = $character.setProperties())
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Creator - Properties</title>
</svelte:head>
<h1>Properties</h1>
<ExplanationBlock rule={Properties} />
<details class='formulae-details'>
	<summary>Properties Formulae</summary>
	<div class='formulae-card'>
		<ul>
			{#each PropertiesList.list as property}
				{#if property.name == 'Health'}
					<li>{property.desc[0]}</li>
					<li>{property.desc[1]}</li>
				{:else}
					<li>{property.desc[0]}</li>
				{/if}
			{/each}
		</ul>
	</div>
</details>
<div class='section-card properties-list'>
	<div class='prop-block'>
		<div class='prop-item'>
			{$character.properties.speed.name}: 
			{$character.properties.speed.score}
		</div>
		<div class='prop-item'>
			{$character.properties.experience.name}: 
			{$character.properties.experience.score}
		</div>
		<div class='prop-item'>
			{$character.properties.carry.name}:
			{$character.properties.carry.score}
		</div>
		<div class='prop-item'>
			{$character.properties.psyche.name}: 
			{$character.properties.psyche.score}
		</div>
	</div>
	<div class='prop-block'>
		<div class='prop-item'>
			{$character.properties.dodge.name}: 
			{$character.properties.dodge.score}
		</div>
		<div class='prop-item'>
			{$character.properties.intellect.name}: 
			{$character.properties.intellect.score}
		</div>
		<div class='prop-item'>
			{$character.properties.block.name}: 
			{$character.properties.block.score}
		</div>
		<div class='prop-item'>
			{$character.properties.luck.name}: 
			{$character.properties.luck.score}
		</div>
	</div>
</div>
<div class='section-card'>
	<BodyParts {character} readonly=false />
</div>


<style>
	.formulae-details {
		margin: var(--std-margin);
	}
	.formulae-card {
		padding: var(--std-padding);
	}
	.properties-list {
		display: flex;
		justify-content: space-between;
		text-align: left;
	}
	.prop-block {
		width: 50%;
	}
	.prop-item {
		margin: var(--std-margin);
	}
	li {
		margin: var(--std-margin);
	}
</style>
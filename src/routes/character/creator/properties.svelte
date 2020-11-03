<script>
	import BodyParts from 'views/character/BodyParts.svelte'
	import Properties from 'rules/Properties.js'
	import PropertiesList from 'lists/PropertiesList.js'
	import { beforeUpdate } from 'svelte'
	import { character } from 'stores/characterStore.js'

	beforeUpdate(_ => $character = $character.setProperties())
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Creator - Properties</title>
</svelte:head>
<div class='creator-page'>
	<h1>Properties</h1>
	<div class='explanation'>
		{#each Properties.text as line}
			<p>{line}</p>
		{/each}
		<p>Your Character's Properties are calculated automatically:</p>
	</div>
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
		<div class='section-block'>
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
		<div class='section-block'>
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
		<BodyParts {character} readonly={true}/>
	</div>
</div>


<style>
	.formulae-details {
		margin: var(--s100);
	}
	.formulae-card {
		padding: var(--s100);
	}
	.properties-list {
		display: flex;
		justify-content: space-around;
		text-align: left;
	}
	.prop-item {
		margin: var(--s10);
	}
</style>
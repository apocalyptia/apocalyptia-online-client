<script>
import { beforeUpdate } from 'svelte'
import { character } from '../../stores/characterStore'
import Properties from '../../components/rules/Properties'
import NavBar from '../../components/views/controls/NavBar.svelte'

Properties.setScores($character)

beforeUpdate(() => {
	Properties.setScores($character)
	$character = $character
})
</script>


<h1>Properties</h1>
<div class='explanation'>
	{#each Properties.explanation as line}
		<p>{line}</p>
	{/each}
</div>
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
			{$character.properties.health.name}: 
			{$character.properties.health.score}
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
<NavBar links={{back: '/creator/skills', next: '/creator/abilities'}}/>


<style>
.explanation {
	padding: var(--base-unit);
}
.properties-list {
	display: flex;
	text-align: left;
}
@media only screen and (max-width: 900px) {
	.section-block {
		padding: var(--third-unit);
		width: 100%;
	}
	.prop-item {
		margin: var(--half-unit);
		width: 100%;
	}
}
@media only screen and (min-width: 900px) {
	.section-block {
		display: flex;
		justify-content: space-between;
		padding: var(--third-unit);
		width: 100%;
	}
	.prop-item {
		margin: var(--half-unit);
		width: 25%;
	}
}
</style>
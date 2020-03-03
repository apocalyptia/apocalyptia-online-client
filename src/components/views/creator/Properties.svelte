<script>
import { character } from '../../../stores/characterStore'
import Capitalize from '../../functions/Capitalize'
import Properties from '../../rules/Properties'
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
			{Capitalize($character.properties.speed.name)}: 
			{$character.properties.speed.score}
		</div>
		<div class='prop-item'>
			{Capitalize($character.properties.experience.name)}: 
			{$character.properties.experience.score}
		</div>
		<div class='prop-item'>
			{Capitalize($character.properties.health.name)}: 
			{$character.properties.health.score}
		</div>
		<div class='prop-item'>
			{Capitalize($character.properties.psyche.name)}: 
			{$character.properties.psyche.score}
		</div>
	</div>
	<div class='section-block'>
		<div class='prop-item'>
			{Capitalize($character.properties.dodge.name)}: 
			{$character.properties.dodge.score}
		</div>
		<div class='prop-item'>
			{Capitalize($character.properties.intellect.name)}: 
			{$character.properties.intellect.score}
		</div>
		<div class='prop-item'>
			{Capitalize($character.properties.block.name)}: 
			{$character.properties.block.score}
		</div>
		<div class='prop-item'>
			{Capitalize($character.properties.luck.name)}: 
			{$character.properties.luck.score}
		</div>
	</div>
</div>


<style>
.explanation {
	padding: var(--base-unit);
}
.properties-list {
	display: flex;
	text-align: left;
}
@media only screen and (max-width: 768px) {
	.section-block {
		padding: var(--third-unit);
		width: 100%;
	}
	.prop-item {
		margin: var(--half-unit);
		width: 100%;
	}
}
@media only screen and (min-width: 768px) {
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
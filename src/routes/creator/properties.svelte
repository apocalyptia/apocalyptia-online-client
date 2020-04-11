<script>
import { beforeUpdate } from 'svelte'
import { character } from '../../stores/characterStore'
import BodyLocations from '../../components/views/ui/BodyLocations.svelte'
import Properties from '../../components/rules/Properties'
import NavBar from '../../components/views/controls/NavBar.svelte'

beforeUpdate(() => $character = Properties.setScores($character))
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
	<BodyLocations character={$character} />
</div>
<NavBar links={{back: '/creator/skills', next: '/creator/abilities'}}/>


<style>
.properties-list {
	display: flex;
	justify-content: space-around;
	text-align: left;
}
.prop-item {
	margin: var(--s10);
}
</style>
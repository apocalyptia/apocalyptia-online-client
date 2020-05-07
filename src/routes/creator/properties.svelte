<script>
import { beforeUpdate } from 'svelte'
import { character } from '../../stores/characterStore'
import BodyLocations from '../../components/views/ui/BodyLocations.svelte'
import Properties from '../../components/rules/properties/Properties'
import NavBar from '../../components/views/controls/NavBar.svelte'


beforeUpdate(() => $character = Properties.setScores($character))
</script>


<h1>Properties</h1>
<div class='explanation'>
	{#each Properties.explanation as line}
		<p>{line}</p>
	{/each}
	<p>Your Character's Properties are calculated automatically:</p>
</div>
<details>
		<summary>Properties Formulae</summary>
		<div>
			<ul>
				{#each Properties.list as property}
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
			{$character.props.speed.name}: 
			{$character.props.speed.score}
		</div>
		<div class='prop-item'>
			{$character.props.experience.name}: 
			{$character.props.experience.score}
		</div>
		<div class='prop-item'>
			{$character.props.carry.name}:
			{$character.props.carry.score}
		</div>
		<div class='prop-item'>
			{$character.props.psyche.name}: 
			{$character.props.psyche.score}
		</div>
	</div>
	<div class='section-block'>
		<div class='prop-item'>
			{$character.props.dodge.name}: 
			{$character.props.dodge.score}
		</div>
		<div class='prop-item'>
			{$character.props.intellect.name}: 
			{$character.props.intellect.score}
		</div>
		<div class='prop-item'>
			{$character.props.block.name}: 
			{$character.props.block.score}
		</div>
		<div class='prop-item'>
			{$character.props.luck.name}: 
			{$character.props.luck.score}
		</div>
	</div>
</div>
<div class='section-card'>
	<BodyLocations {character} />
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
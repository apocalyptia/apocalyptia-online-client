<script>
import { character } from '../../../stores'
import { d6 } from '../../helpers/Random'
import Capitalize from '../../helpers/Capitalize'
import { PropertyExplanation } from '../../rules/Properties'

const properties = Object.keys($character.properties)

const rollLuck = () => {
	if ($character.properties.luck.base == 0) {
		$character.properties.luck.base = d6()
		$character.properties.luck.score = $character.properties.luck.base + $character.properties.luck.mods
	}
}
</script>


<h1>Properties</h1>
<div class='explanation'>
	<p>{PropertyExplanation}</p>
</div>
<div class='properties-list'>
	<div class='prop-col'>
		<div class='left-col'>
			<div class='prop-item'>
				{Capitalize($character.properties.health.name)}: 
				{$character.properties.health.score}
			</div>
			<div class='prop-item'>
				{Capitalize($character.properties.psyche.name)}: 
				{$character.properties.psyche.score}
			</div>
		</div>
		<div class='right-col'>
			<div class='prop-item'>
				{Capitalize($character.properties.speed.name)}: 
				{$character.properties.speed.score}
			</div>
			<div class='prop-item'>
				{Capitalize($character.properties.intellect.name)}: 
				{$character.properties.intellect.score}
			</div>
		</div>
	</div>
	<div class='def-list'>
		<div class='def-header centered'>Defenses</div>
		<div class='left-col'>
			<div class='prop-item centered'>
				{Capitalize($character.properties.block.name)}: 
				{$character.properties.block.score}
			</div>
		</div>
		<div class='right-col'>
			<div class='prop-item centered'>
				{Capitalize($character.properties.dodge.name)}: 
				{$character.properties.dodge.score}
			</div>
		</div>
	</div>
	<div class='prop-col luck'>
		<div class='prop-item centered'>
			{Capitalize($character.properties.luck.name)}: 
			{$character.properties.luck.score}
		</div>
		<div class='prop-item'>
			{#each $character.properties.luck.description as luckParagraph}
				<p>{luckParagraph}</p>
			{/each}
		</div>
		<div class='prop-item centered'>
			<button on:click={rollLuck}>
				Roll Luck
			</button>
		</div>
	</div>
</div>


<style>
.explanation {
	padding: var(--base-unit);
}
.properties-list {
	display: flex;
	flex-direction: column;
	text-align: left;
}
.def-list {
	border: var(--smallest-unit) solid;
	margin: var(--half-unit);
	padding: var(--half-unit);
}
.def-list .prop-item {
	display: inline-block;
}
@media only screen and (max-width: 768px) {
	.def-list .prop-item {
		display: block;
	}
}
.def-header {
	font-size: calc(var(--base-unit) * 1.25);
}
.prop-col {
	border: var(--smallest-unit) solid;
	margin: var(--half-unit);
	padding: var(--half-unit);
}
.left-col {
	float: left;
	width: 50%;
}
.right-col {
	float: right;
	width: 50%;
}
.centered {
	text-align: center;
}
.prop-item {
	margin: var(--base-unit);
}
</style>
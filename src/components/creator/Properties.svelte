<script>
	import { d6 } from '../../helpers/Random'
	import { character } from '../../stores'
	import {
		PropertyExplanation,
		Luck
	} from '../rules/Properties'

	const properties = Object.keys($character.properties)

	const rollLuck = () => {
		if ($character.properties.luck.base == 0) {
			$character.properties.luck.base = d6()
			$character.setStat('properties', 'luck')
		}
	}
</script>

<div class='properties-step'>
	<div class='step-title'>
		<h2>Properties</h2>
	</div>
	<div class='explanation'>
		<p>{PropertyExplanation}</p>
	</div>
	<div class='properties-list'>
		<div class='prop-col'>
			<div class='left-col'>
				<div class='prop-item'>
					{$character.properties.physicalHealth.name}: {$character.properties.physicalHealth.score}
				</div>
				<div class='prop-item'>
					{$character.properties.mentalHealth.name}: {$character.properties.mentalHealth.score}
				</div>
			</div>
			<div class='right-col'>
				<div class='prop-item'>
					{$character.properties.speed.name}: {$character.properties.speed.score}
				</div>
				<div class='prop-item'>
					{$character.properties.xp.name}: {$character.properties.xp.score}
				</div>
			</div>
		</div>
		<div class='def-list'>
			<div class='def-header centered'>Defenses</div>
			<div class='left-col'>
				<div class='prop-item centered'>
					{$character.properties.block.name}: {$character.properties.block.score}
				</div>
			</div>
			<div class='right-col'>
				<div class='prop-item centered'>
					{$character.properties.dodge.name}: {$character.properties.dodge.score}
				</div>
			</div>
		</div>
		<div class='prop-col luck'>
			<div class='prop-item centered'>
				{$character.properties.luck.name}: {$character.properties.luck.score}
			</div>
			<div class='prop-item'>
				{#each Luck.description as luckParagraph}
					<p>{luckParagraph}</p>
				{/each}
				
			</div>
			<div class='prop-item centered'>
				<button on:click={rollLuck}>Roll Luck</button>
			</div>
		</div>
	</div>
</div>

<style>
	.explanation {
		padding: 1rem;
	}
	.properties-list {
		display: flex;
		flex-direction: column;
		text-align: left;
	}
	.def-list {
		border: 1px solid lime;
		margin: .5rem;
		padding: .5rem;
	}
	.def-list .prop-item {
		display: inline-block;
	}
	@media (max-width: 500px) {
		.def-list .prop-item {
			display: block;
		}
	}
	.def-header {
		font-size: 1.25rem;
		margin-top: 1rem;
	}
	.prop-col {
		border: 1px solid lime;
		margin: .5rem;
		padding: .5rem;
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
		margin: 1rem;
	}
</style>
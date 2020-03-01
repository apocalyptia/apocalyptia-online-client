<script>
import { character } from '../../../stores/characterStore'
import Capitalize from '../../functions/Capitalize'

const traits = Object.keys($character.traits)
const skills = Object.keys($character.skills)
</script>


<div class="character_sheet_1">
	<div class='section-card description-section'>
		<div class='centered'>
			<h2>Description</h2>
		</div>
		<div class='section-block'>
			<span>Player: {$character.description.player.value}</span>
			<span>Character: {$character.description.character.value}</span>
		</div>
		<div class='section-block'>
			<span>Age: {$character.description.age.value}</span>
			<span>Height: {$character.description.height.value}</span>
			<span>Weight: {$character.description.weight.value}</span>
		</div>
		<div class='section-block'>
			<span>Sex: {$character.description.sex.value}</span>
			<span>Skin: {$character.description.skin.value}</span>
			<span>Hair: {$character.description.hair.value}</span>
		</div>
	</div>

	<div class='section-card traits-section'>
		<div class='centered'>
			<h2>Traits</h2>
		</div>
		<div class='section-block'>
			{#each traits as t}
				<div class='trait-column'>
					<span class='trait-name'>
						{Capitalize($character.traits[t].name)}: 
						{$character.traits[t].score}
					</span>
				</div>
			{/each}
		</div>
	</div>

	<div class='section-card skills-section'>
		<div class='centered'>
			<h2>Skills</h2>
		</div>
		<div class='section-block'>
			{#each traits as t}
				<div class='skill-column'>
					{#each skills as s}
						{#if t == $character.skills[s].parent}
							<div class='skill-name'>
								{Capitalize($character.skills[s].name)}: 
								{$character.skills[s].score}
							</div>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<div class='section-card properties-section'>
		<div class='centered'>
			<h2>Properties</h2>
		</div>
		<div class='section-block'>
			<div class='prop-item'>
				{Capitalize($character.properties.health.name)}: 
				{$character.properties.health.score}
			</div>
			<div class='prop-item'>
				{Capitalize($character.properties.psyche.name)}: 
				{$character.properties.psyche.score}
			</div>
			<div class='prop-item'>
				{Capitalize($character.properties.luck.name)}: 
				{$character.properties.luck.score}
			</div>
			<div class='prop-item'>
				{Capitalize($character.properties.block.name)}: 
				{$character.properties.block.score}
			</div>
		</div>
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
				{Capitalize($character.properties.intellect.name)}: 
				{$character.properties.intellect.score}
			</div>
			<div class='prop-item'>
				{Capitalize($character.properties.dodge.name)}: 
				{$character.properties.dodge.score}
			</div>
		</div>
	</div>

	<div class='section-card abilities-section'>
		<div class='centered'>
			<h2>Abilities</h2>
		</div>
		<div class='current-abilities-header'>
			<span class='l-col'>Name</span>
			<span class='s-col'>XP</span>
			<span class='s-col'>Max</span>
			<span class='s-col'>Taken</span>
		</div>
		<div class='current-abilities-list'>
			{#each $character.abilities as ability}
				<div class='current-ability-row'>
					<span class='l-col'>
						{ability.name}
						{#if ability.options[0]}
							&nbsp;({Capitalize(ability.options[0].name)})
						{/if}
					</span>
					<span class='s-col'>{ability.xp}</span>
					<span class='s-col'>{ability.max}</span>
					<span class='s-col'>{ability.taken}</span>
				</div>
			{/each}
		</div>
	</div>
</div>


<style>
.section-card {
	display: block;
}
.section-block {
	display: flex;
	justify-content: space-between;
	padding: var(--third-unit);
	width: 100%;
}
.trait-column,
.skill-column {
	width: 25%;
}
.trait-name,
.skill-name {
	padding: var(--third-unit);
}
.prop-item {
	width: 25%;
}
.current-abilities-header,
.current-ability-row {
	align-items: baseline;
	display: flex;
	justify-content: space-between;
	margin: var(--base-unit) 0;
}
.current-abilities-header {
	font-weight: bold;
	text-decoration: underline;
}
.l-col {
	flex: 3;
}
.s-col {
	flex: 1;
	text-align: center;
}
.centered {
	font-weight: bold;
	text-align: center;
}
</style>
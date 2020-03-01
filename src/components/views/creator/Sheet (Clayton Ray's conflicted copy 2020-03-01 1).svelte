<script>
import { character } from '../../../stores/characterStore'
import Capitalize from '../../functions/Capitalize'

const traits = Object.keys($character.traits)
const skills = Object.keys($character.skills)
</script>


<div class="character_sheet_1">
	<div class='section-card description-section'>
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
		<div class='section-block'>
			{#each traits as t}
				<div class='skill-column'>
					{#each skills as s}
						{#if t == $character.skills[s].parent}
								{Capitalize($character.skills[s].name)}: 
								{$character.skills[s].score}
							</span>
						{/if}
					{/each}
				</div>
			{/each}
		</div>
	</div>

	<div class='section-card properties-list'>
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
				{Capitalize($character.properties.intellect.name)}: 
				{$character.properties.intellect.score}
			</div>
			<div class='prop-item'>
				{Capitalize($character.properties.experience.name)}: 
				{$character.properties.intellect.score}
			</div>
			<div class='prop-item'>
				{Capitalize($character.properties.dodge.name)}: 
				{$character.properties.dodge.score}
			</div>
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
.trait-column {
	width: 25%;
}
.trait-name {
	padding: var(--third-unit);
}
.properties-list {
	text-align: left;
}
.prop-item {
	margin: var(--base-unit);
}
</style>
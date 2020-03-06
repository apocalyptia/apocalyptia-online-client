<script>
import { character } from '../../stores/characterStore'
import AmmoItemTable from '../../components/views/tables/AmmoItemTable.svelte'
import ArmorItemTable from '../../components/views/tables/ArmorItemTable.svelte'
import MeleeWeaponItemTable from '../../components/views/tables/MeleeWeaponItemTable.svelte'
import RangedWeaponItemTable from '../../components/views/tables/RangedWeaponItemTable.svelte'

const traits = Object.values($character.traits)
const skills = Object.values($character.skills)
</script>


<div class="character_sheet_1">
	<div class='section-card description-section'>
		<div class='centered'>
			<h2>Description</h2>
		</div>
		<div class='section-block'>
			<span>Player: {$character.description.player.value}</span>
			<span>Identity: {$character.description.identity.value}</span>
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
						{t.name}: 
						{t.score}
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
						{#if t.name == s.parent}
							<div class='skill-name'>
								{s.name}: 
								{s.score}
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
				{$character.properties.health.name}: 
				{$character.properties.health.score}
			</div>
			<div class='prop-item'>
				{$character.properties.psyche.name}: 
				{$character.properties.psyche.score}
			</div>
			<div class='prop-item'>
				{$character.properties.luck.name}: 
				{$character.properties.luck.score}
			</div>
			<div class='prop-item'>
				{$character.properties.block.name}: 
				{$character.properties.block.score}
			</div>
		</div>
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
				{$character.properties.intellect.name}: 
				{$character.properties.intellect.score}
			</div>
			<div class='prop-item'>
				{$character.properties.dodge.name}: 
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
							&nbsp;({ability.options[0].name})
						{/if}
					</span>
					<span class='s-col'>{ability.xp}</span>
					<span class='s-col'>{ability.max}</span>
					<span class='s-col'>{ability.taken}</span>
				</div>
			{/each}
		</div>
	</div>

	<div class='section-card gear-section'>
		<div class='centered'>
			<h2>Gear</h2>
		</div>
		<div class='gear-item'>
			<MeleeWeaponItemTable item={$character.gear.meleeWeapons.inventory[0]}/>
		</div>
		<div class='gear-item'>
			<RangedWeaponItemTable item={$character.gear.rangedWeapons.inventory[0]}/>
		</div>
		<div class='gear-item'>
			<AmmoItemTable item={$character.gear.ammo.inventory[0]}/>
		</div>
		<div class='gear-item'>
			<ArmorItemTable item={$character.gear.armor.inventory[0]}/>
		</div>
	</div>
</div>


<style>
@media only screen and (max-width: 900px) {
	.section-block {
		display: block;
		padding: var(--third-unit);
		width: 100%;
	}
	.section-block span {
		display: block;
	}
	.prop-item {
		width: 100%;
	}
	.trait-column,
	.skill-column {
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
		width: 25%;
	}
	.trait-column,
	.skill-column {
		width: 25%;
	}
}
.section-card {
	display: block;
}
.trait-name,
.skill-name {
	padding: var(--third-unit);
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
.gear-item {
	margin-top: var(--base-unit);
	margin-bottom: var(--base-unit);
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
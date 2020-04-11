<script>
import { character } from '../../../stores/characterStore'
import AmmoItemTable from '../tables/AmmoItemTable.svelte'
import ArmorItemTable from '../tables/ArmorItemTable.svelte'
import MeleeWeaponItemTable from '../tables/MeleeWeaponItemTable.svelte'
import RangedWeaponItemTable from '../tables/RangedWeaponItemTable.svelte'
import BodyLocations from './BodyLocations.svelte'

const traits = Object.values($character.traits)
const skills = Object.values($character.skills)
</script>


<div class="character-sheet">

	<div class='section-card description-section'>
		<div class='centered'>
			<h2>Description</h2>
		</div>
		<div class='section-block'>
			<div>Character: {$character.description.identity.value}</div>
		</div>
		<div class='flex-block'>
			<div class='section-block'>
				<div>Age: {$character.description.age.value}</div>
				<div>Height: {$character.description.height.value}</div>
				<div>Weight: {$character.description.weight.value}</div>
			</div>
			<div class='section-block'>
				<div>Sex: {$character.description.sex.value}</div>
				<div>Skin: {$character.description.skin.value}</div>
				<div>Hair: {$character.description.hair.value}</div>
			</div>
		</div>
	</div>

	<div class='section-card traits-section'>
		<div class='centered'>
			<h2>Traits</h2>
		</div>
		<div class='flex-block'>
			{#each traits as t}
				<div class='section-block trait-block'>
					<div class='trait-item'>
						{t.name}: {t.score}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class='section-card skills-section'>
		<div class='centered'>
			<h2>Skills</h2>
		</div>
		<div class='flex-block'>
			{#each traits as t}
				<div class='section-block skill-block'>
					{#each skills as s}
						{#if t.name == s.parent}
							<div class='skill-item'>
								{s.name}: {s.score}
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
		<div class='flex-block'>
			<div class='section-block'>
				<div class='prop-item'>
					{$character.properties.speed.name}: 
					{$character.properties.speed.score}
				</div>
				<div class='prop-item'>
					{$character.properties.carry.name}: 
					{$character.properties.carry.current} / 
					{$character.properties.carry.score}
				</div>
				<div class='prop-item'>
					{$character.properties.experience.name}: 
					{$character.properties.experience.remaining} / 
					{$character.properties.experience.score}
				</div>
				<div class='prop-item'>
					{$character.properties.psyche.name}: 
					{$character.properties.psyche.current} / 
					{$character.properties.psyche.score}
				</div>
			</div>
			<div class='section-block'>
				<div class='prop-item'>
					{$character.properties.dodge.name}: 
					{$character.properties.dodge.score}
				</div>
				<div class='prop-item'>
					{$character.properties.block.name}: 
					{$character.properties.block.score}
				</div>
				<div class='prop-item'>
					{$character.properties.intellect.name}: 
					{$character.properties.intellect.score}
				</div>
				<div class='prop-item'>
					{$character.properties.luck.name}: 
					{$character.properties.luck.current} / 
					{$character.properties.luck.score}
				</div>
			</div>
		</div>
	</div>

	<div class='section-card health-section'>
		<div class='centered'>
			<h2>Health</h2>
		</div>
		<div class='flex-block'>
			<div class='section-block locations'>
				<BodyLocations character={$character} />
			</div>
		</div>
	</div>

	<div class='section-card abilities-section'>
		<div class='centered'>
			<h2>Abilities</h2>
		</div>
		<div class='abilities-header'>
			<span class='l-col'>Name</span>
			<span class='s-col'>XP</span>
			<span class='s-col'>Max</span>
			<span class='s-col'>Taken</span>
		</div>
		{#each $character.abilities as ability}
			<div class='ability-row'>
				<span class='l-col'>
					{ability.name}{ability.options[0] ? ` (${ability.options[0].name})` : ``}
				</span>
				<span class='s-col'>{ability.xp}</span>
				<span class='s-col'>{ability.max}</span>
				<span class='s-col'>{ability.taken}</span>
			</div>
		{/each}
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
.section-card {
	display: block;
}
.flex-block {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
.section-block {
	margin: var(--s100);
}
.locations {
	width: 100%;
}
div[class*='-item'] {
	display: block;
}
.abilities-header,
.ability-row {
	align-items: baseline;
	display: flex;
	justify-content: space-between;
	margin: var(--s100);
}
.abilities-header {
	font-weight: bold;
	text-decoration: underline;
}
.l-col {
	flex: 3;
	text-align: left;
}
.s-col {
	flex: 1;
	text-align: center;
}
.gear-item {
	margin-bottom: var(--s100);
	margin-top: var(--s100);
}
.centered {
	font-weight: bold;
	text-align: center;
}
</style>
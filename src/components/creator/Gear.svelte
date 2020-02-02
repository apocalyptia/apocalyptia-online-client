<script>
	import { character } from '../../stores'
	import RandomRoll from '../helpers/Random'
	import MasterGearList from '../rules/Gear'
	import AmmoList from '../rules/gear/weapons/AmmoList'
	import ArmorList from '../rules/gear/ArmorList'
	import MeleeWeaponList from '../rules/gear/weapons/MeleeWeaponList'
	import RangedWeaponList from '../rules/gear/weapons/RangedWeaponList'

	let melee = {
		name: '',
		sz: '',
		dmg: '',
		rng: '',
		attributes: []
	}

	let ranged = {
		name: '',
		sz: '',
		dmg: '',
		rng: '',
		attributes: [],
		mag: '',
		cal: ''
	}

	let armor = {
		name: '',
		sz: '',
		dr: '',
		loc: '',
		attributes: []
	}

	const rollMelee = () => {
		melee = RandomRoll(MeleeWeaponList)
	}

	const rollRanged = () => {
		ranged = RandomRoll(RangedWeaponList)
	}

	const rollArmor = () => {
		armor = RandomRoll(ArmorList)
	}
</script>

<div class='gear-step'>
	<div class='section-card'>
		<h3>Melee Weapon</h3>
		<div class='table'>
			<div class='row'>
				<div class='col'>
					<div class='heading'>Name</div>
					<div class='content'>{melee.name}</div>
				</div>
				<div class='col'>
					<div class='heading'>DMG</div>
					<div class='content'>{melee.dmg}</div>
				</div>
				<div class='col'>
					<div class='heading'>RNG</div>
					<div class='content'>{melee.rng}</div>
				</div>
				<div class='col'>
					<div class='heading'>Size</div>
					<div class='content'>{melee.sz}</div>
				</div>
				<div class='col'>
					<div class='heading'>Attributes</div>
					<div class='content'>
						{#each melee.attributes as attribute, index}
							{attribute.name}{#if index < melee.attributes.length - 1},&nbsp;{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
		<div class='center-button'>
			<button on:click={rollMelee}>Random</button>
		</div>
	</div>
	<div class='section-card'>
		<h3>Ranged Weapon</h3>
		<div class='table'>
			<div class='row'>
				<div class='col'>
					<div class='heading'>Name</div>
					<div class='content'>{ranged.name}</div>
				</div>
				<div class='col'>
					<div class='heading'>DMG</div>
					<div class='content'>{ranged.dmg}</div>
				</div>
				<div class='col'>
					<div class='heading'>RNG</div>
					<div class='content'>{ranged.rng}</div>
				</div>
				<div class='col'>
					<div class='heading'>Mag</div>
					<div class='content'>{ranged.mag}</div>
				</div>
				<div class='col'>
					<div class='heading'>Cal</div>
					<div class='content'>{ranged.cal}</div>
				</div>
				<div class='col'>
					<div class='heading'>Size</div>
					<div class='content'>{ranged.sz}</div>
				</div>
				<div class='col'>
					<div class='heading'>Attributes</div>
					<div class='content'>
						{#each ranged.attributes as attribute, index}
							{attribute.name}{#if index < ranged.attributes.length - 1},&nbsp;{/if}
						{/each}
					</div>
				</div>
			</div>
		</div>
		<div class='center-button'>
			<button on:click={rollRanged}>Random</button>
		</div>
	</div>
	<div class='section-card'>
		<h3>Armor</h3>
		<div class='table'>
			<div class='row'>
				<div class='col'>
					<div class='heading'>Name</div>
					<div class='content'>{armor.name}</div>
				</div>
				<div class='col'>
					<div class='heading'>DR</div>
					<div class='content'>{armor.dr}</div>
				</div>
				<div class='col'>
					<div class='heading'>Locations</div>
					<div class='content'>{armor.loc}</div>
				</div>
				<div class='col'>
					<div class='heading'>Size</div>
					<div class='content'>{armor.sz}</div>
				</div>
				<div class='col'>
					<div class='heading'>Attributes</div>
					<div class='content'>
						{#each armor.attributes as attribute, index}
							{attribute.name}{#if index < armor.attributes.length - 1},&nbsp;{/if}
						{/each}
				</div>
				</div>
			</div>
		</div>
		<div class='center-button'>
			<button on:click={rollArmor}>Random</button>
		</div>
	</div>
</div>

<style>
	.section-card {
		display: block;
		margin: 1rem;
	}
	.table {
		height: 3rem;
		margin-bottom: 1rem;
		width: 100%;
	}
	.row {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		height: 3rem;
		justify-content: space-between;
		align-items: start;
		align-content: center;
		max-width: 100%;
	}
	.col {
		border: 1px solid;
		flex: 1 0 auto;
		height: 3rem;
		word-wrap: normal
	}
	.heading {
		font-weight: bold;
		border-bottom: 1px solid;
	}
	.content {
		align-content: center;
		word-wrap: normal;
	}
</style>
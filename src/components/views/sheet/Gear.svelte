<script>
import Capitalize from '../../helpers/Capitalize'
import CharacterSheet from '../ui/CharacterSheet.svelte'
import CoverTable from '../tables/CoverTable.svelte'
import Equipment from '../../rules/gear/equipment/Equipment'
import GearBlock from '../ui/GearBlock'
import ItemModal from './ItemModal.svelte'
import { character } from '../../../stores/characterStore'


const gearList = [
	'melee',
	'ranged',
	'ammo',
	'armor',
	'equipment'
]

let modalVisible = false

const trashItem = (item, i=0) => {
	if (item == 'melee') $character.gear.melee.inventory.splice(i)
	else if (item == 'ranged') $character.gear.ranged.inventory.splice(i)
	else if (item == 'ammo') $character.gear.ammo.inventory.splice(i)
	else if (item == 'armor') $character.gear.armor.inventory.splice(i)
	else if (item == 'equipment') $character.gear.equipment.inventory.splice(i)
	$character = $character
}

const toggleModal = () => {
	modalVisible = !modalVisible
}
</script>


<details class='sheet-card'>
	<summary class='sheet-card-title'>
		Gear
	</summary>
	<div class='gear-category-list'>
		{#each gearList as gearType}
			<details class='gear-category'>
				<summary>{Capitalize(gearType)}</summary>
				<div class='gear-item-list'>
					{#each $character.gear[gearType].inventory as item, i}
						<div class='gear-item'>
							<GearBlock rule={item} />
							<div class='trash'>
								<button on:click={() => trashItem(gearType, i)} class='trash-item-button'>
									<div class='button-icon'>&#10006;</div>
								</button>
							</div>
						</div>
					{/each}
				</div>
				<div class='add-item-section'>
					<button on:click={toggleModal} class='add-item-button'>
						<div class='button-icon'>+</div>
					</button>
					{#if modalVisible}
						<ItemModal on:close={toggleModal} {gearType} />
					{/if}
				</div>
			</details>
		{/each}
	</div>
</details>


<style>
details {
	margin: 0;
}

.sheet-card {
	margin: var(--s100);
	padding: 0;
}

.gear-category-list {
	padding: var(--s100);
}

.gear-category {
	border: 1px solid lime;
	box-sizing: border-box;
	display: block;
	margin-bottom: var(--s100);
	width: 100%;
}

.gear-item-list {
	padding: var(--s100);
	padding-bottom: 0;
}

.gear-item {
	border: 1px solid lime;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	margin-bottom: var(--s100);
	padding: var(--s100);
	width: 100%;
}

.trash {
	text-align: right;
}
.trash-item-button {
	background-color: crimson;
	border: 1px solid crimson;
	color: rgba(15, 30, 15, 1);
	height: var(--s250);
	padding: 0;
	width: var(--s250);
}
.trash-item-button:hover {
	background-color: rgba(15, 30, 15, 1);
	color: crimson;
}

.add-item-section {
	padding-top: 0;
}
.add-item-button {
	background-color: lime;
	border: 1px solid lime;
	color: rgba(15, 30, 15, 1);
	font-size: var(--s150);
	font-weight: bold;
	height: var(--s250);
	padding: 0;
	width: var(--s250);
}
.add-item-button:hover {
	background-color: rgba(15, 30, 15, 1);
	color: lime;
}
</style>
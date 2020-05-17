<script>
import CoverTable from '../tables/CoverTable.svelte'
import GearBlock from '../ui/GearBlock'
import { character } from '../../../stores/characterStore'


const trashItem = (item) => {
	if (item == 'melee') $character.gear.meleeWeapons.inventory.shift()
	else if (item == 'ranged') $character.gear.rangedWeapons.inventory.shift()
	else if (item == 'ammo') $character.gear.ammo.inventory.shift()
	else if (item == 'armor') $character.gear.armor.inventory.shift()
	$character = $character
}

const addItem = () => {
}
</script>


<details class='sheet-card'>
	<summary class='sheet-card-title'>
		Gear
	</summary>
	<div class='sheet-card-table'>
		{#if $character.gear.meleeWeapons.inventory.length}
			<div class='gear-item'>
				<GearBlock rule={$character.gear.meleeWeapons.inventory[0]}/>
				<div class='trash'>
					<button on:click={() => trashItem('melee')} class='trash-item-button'>X</button>
				</div>
			</div>
		{/if}
		{#if $character.gear.rangedWeapons.inventory.length}
			<div class='gear-item'>
				<GearBlock rule={$character.gear.rangedWeapons.inventory[0]}/>
				<div class='trash'>
					<button on:click={() => trashItem('ranged')} class='trash-item-button'>X</button>
				</div>
			</div>
		{/if}
		{#if $character.gear.ammo.inventory.length}
			<div class='gear-item'>
				<GearBlock rule={$character.gear.ammo.inventory[0]}/>
				<div class='trash'>
					<button on:click={() => trashItem('ammo')} class='trash-item-button'>X</button>
				</div>
			</div>
		{/if}
		{#if $character.gear.armor.inventory.length}
			<div class='gear-item'>
				<GearBlock rule={$character.gear.armor.inventory[0]}/>
				<div class='trash'>
					<button on:click={() => trashItem('armor')} class='trash-item-button'>X</button>
				</div>
			</div>
		{/if}
		<div class='add-item-section'>
			<button on:click={() => addItem()} class='add-item-button'>+</button>
		</div>
	</div>
</details>


<style>
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
	font-weight: bold;
	height: var(--s250);
	width: var(--s250);
}
.trash-item-button:hover {
	background-color: rgba(15, 30, 15, 1);
	color: crimson;
}

.add-item-button {
	background-color: lime;
	border: 1px solid lime;
	color: rgba(15, 30, 15, 1);
	font-size: var(--s200);
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
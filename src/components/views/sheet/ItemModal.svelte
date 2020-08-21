<script>
	import AmmoList from '../../rules/gear/weapons/ammo/AmmoList'
	import ArmorList from '../../rules/gear/armor/ArmorList'
	import EquipmentList from '../../rules/gear/equipment/EquipmentList'
	import MeleeList from '../../rules/gear/weapons/melee/MeleeWeaponList'
	import RangedList from '../../rules/gear/weapons/ranged/RangedWeaponList'
	import { character } from '../../../stores/characterStore'
	import { createEventDispatcher, onDestroy } from 'svelte'

	export let gearType

	let itemList = []

	if (gearType == 'melee') itemList = [...MeleeList]
	else if (gearType == 'ranged') itemList = [...RangedList]
	else if (gearType == 'ammo') itemList = [...AmmoList]
	else if (gearType == 'armor') itemList = [...ArmorList]
	else if (gearType == 'equipment') itemList = [...EquipmentList]

	let selectedItem = itemList[0]

	const dispatch = createEventDispatcher()

	const handleKeydown = e => { if (e.key === 'Escape') dispatch('close') }

	const previouslyFocused = typeof document !== 'undefined' && document.activeElement

	if (previouslyFocused) onDestroy(() => previouslyFocused.focus())

	const save = () => {
		if (gearType == 'ammo') selectedItem.qty = 0
		$character.gear[gearType].inventory.push(selectedItem)
		$character = $character
		dispatch('close')
	}
</script>


<svelte:window on:keydown={handleKeydown}/>
<div class="modal-background" on:click={() => dispatch('close')}></div>
<div class="modal" role="dialog" aria-modal="true">
	<div class='modal-content'>
		<div class='item-selection'>
			<select class='item-selector' bind:value={selectedItem}>
				{#each itemList as item}
					<option value='{item}'>{item.name}</option>
				{/each}
			</select>
		</div>
		<div class='btn-row'>
			<button on:click={() => save()}>Save</button>
			<button on:click={() => dispatch('close')}>Close</button>
		</div>
	</div>
</div>


<style>
	.modal-background {
		background-color: rgba(0,0,0,0.3);
		height: 100vh;
		left: 0;
		position: fixed;
		top: 0;
		width: 100vw;
	}
	.modal {
		background-color: rgba(0,0,0,0.9);
		border-radius: var(--radius);
		border: var(--s1) solid;
		color: lime;
		height: fit-content;
		left: 50vw;
		max-height: 75vh;
		overflow: scroll;
		position: fixed;
		scrollbar-width: none;
		top: 50vh;
		transform: translate(-50%, -50%);
		width: 80vw;
	}
	.modal-content {
		margin: var(--s100);
	}
	.item-selection {
		margin: var(--s300);
		text-align: center;
	}
	.item-selector {
		width: 50%;
	}
	.btn-row {
		text-align: center;
	}
	::-webkit-scrollbar {
		display: none;
	}
</style>

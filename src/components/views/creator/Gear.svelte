<script>
import { character } from '../../../stores'
import GearItem from './ui/GearItem.svelte'
</script>


<h1>Gear</h1>
<div class='section-card'>
	<GearItem type={'Melee'} />
</div>
<div class='section-card'>
	<GearItem type={'Ranged'} />
</div>
{#if $character.gear.rangedWeapons.inventory.length}
<div class='section-card'>
	<GearItem type={'Ammo'} />
</div>
{/if}
<div class='section-card'>
	<GearItem type={'Armor'} />
</div>


<style>
.section-card {
	display: block;
}
</style>
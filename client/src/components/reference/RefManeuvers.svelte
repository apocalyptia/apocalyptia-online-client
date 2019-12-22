<script>
	import { Maneuvers } from '../rules/Maneuvers'
	import RefList from './RefList.svelte'
	import NavButtons from '../../layout/NavButtons.svelte'
</script>

<div class='ref-page'>
	<div class='ref-header'>Maneuver Rules</div>
	<svelte:component this={RefList} list={Maneuvers} />
</div>

<style>
	.ref-header {
		font-size: 1.5rem;
		text-align: center;
	}
</style>
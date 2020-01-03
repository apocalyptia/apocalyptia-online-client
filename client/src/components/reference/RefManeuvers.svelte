<script>
	import { fade } from 'svelte/transition'
	import { Maneuvers } from '../rules/Maneuvers'
	import RefList from './RefList.svelte'
</script>

<div class='ref-page' in:fade>
	<div class='ref-header'>Maneuver Rules</div>
	<svelte:component this={RefList} list={Maneuvers} />
</div>
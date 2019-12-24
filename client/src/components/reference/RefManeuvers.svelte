<script>
	import { fade } from 'svelte/transition'
	import { router } from '../../routes'
	import { Maneuvers } from '../rules/Maneuvers'
	import RefList from './RefList.svelte'
	import NavButtons from '../../layout/NavButtons.svelte'
</script>

<div class='ref-page' in:fade>
	<div class='ref-header'>Maneuver Rules</div>
	<svelte:component this={RefList} list={Maneuvers} />
</div>
<button class='ref-back' on:click={router.Reference}>
	Back
</button>
<script>
	import { fade } from 'svelte/transition'
	import { router } from '../../routes'
	import { Dice } from '../rules/Dice'
	import RefList from './RefList.svelte'
</script>

<div class='ref-page' in:fade>
	<div class='ref-header'>Dice Rules</div>
	<svelte:component this={RefList} list={Dice} />
</div>
<button class='ref-back' on:click={router.Reference}>
	Back
</button>
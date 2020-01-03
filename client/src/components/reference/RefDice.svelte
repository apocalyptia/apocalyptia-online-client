<script>
	import { fade } from 'svelte/transition'
	import { Dice } from '../rules/Dice'
	import RefList from './RefList.svelte'
</script>

<div class='ref-page' in:fade>
	<div class='ref-header'>Dice Rules</div>
	<svelte:component this={RefList} list={Dice} />
</div>
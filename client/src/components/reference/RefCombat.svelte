<script>
	import { fade } from 'svelte/transition'
	import { router } from '../../routes'
	import { Combat } from '../rules/Combat'
	import RefList from './RefList.svelte'
	import NavButtons from '../../layout/NavButtons.svelte'
</script>

<div class='ref-page' in:fade>
	<div class='ref-header'>Combat Rules</div>
	<svelte:component this={RefList} list={Combat} />
</div>
<button class='ref-back' on:click={router.Reference}>
	Back
</button>
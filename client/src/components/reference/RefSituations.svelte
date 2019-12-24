<script>
	import { fade } from 'svelte/transition'
	import { router } from '../../routes'
	import { Situations } from '../rules/Situations'
	import RefList from './RefList.svelte'
	import NavButtons from '../../layout/NavButtons.svelte'
</script>

<div class='ref-page' in:fade>
	<div class='ref-header'>Situation Rules</div>
	<svelte:component this={RefList} list={Situations} />
</div>
<button class='ref-back' on:click={router.Reference}>
	Back
</button>
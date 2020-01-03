<script>
	import { fade } from 'svelte/transition'
	import { Combat } from '../rules/Combat'
	import RefList from './RefList.svelte'
</script>

<div class='ref-page' in:fade>
	<div class='ref-header'>Combat Rules</div>
	<svelte:component this={RefList} list={Combat} />
</div>
<script>
	import { fade } from 'svelte/transition'
	import { Combat } from '../../components/rules/Combat'
	import RefList from '../../components/ui/RefList.svelte'
</script>

<div class='ref-page' in:fade>
	<div class='ref-header'>Combat Rules</div>
	<svelte:component this={RefList} list={Combat} />
</div>
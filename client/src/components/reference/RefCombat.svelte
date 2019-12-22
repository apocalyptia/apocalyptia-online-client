<script>
	import { Combat } from '../rules/Combat'
	import RefList from './RefList.svelte'
	import NavButtons from '../../layout/NavButtons.svelte'
</script>

<div class='ref-page'>
	<div class='ref-header'>Combat Rules</div>
	<svelte:component this={RefList} list={Combat} />
</div>

<style>
	.ref-header {
		font-size: 1.5rem;
		text-align: center;
	}
</style>
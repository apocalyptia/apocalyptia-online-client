<script>
	import { Combat } from '../rules/Combat'
	import RefList from './RefList.svelte'
	import NavButtons from '../../layout/NavButtons.svelte'
</script>

<div class='ref-page'>
	<h3>COMBAT REF test</h3>
	<svelte:component this={RefList} list={Combat} />
</div>

<style>
</style>
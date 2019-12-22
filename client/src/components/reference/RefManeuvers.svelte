<script>
	import { Maneuvers } from '../rules/Maneuvers'
	import RefList from './RefList.svelte'
	import NavButtons from '../../layout/NavButtons.svelte'
</script>

<div class='ref-page'>
	<h3>MANEUVERS REF test</h3>
	<svelte:component this={RefList} list={Maneuvers} />
</div>

<style>
</style>
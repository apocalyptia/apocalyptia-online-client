<script>
	import { Situations } from '../rules/Situations'
	import RefList from './RefList.svelte'
	import NavButtons from '../../layout/NavButtons.svelte'
</script>

<div class='ref-page'>
	<h3>SITUATIONS REF test</h3>
	<svelte:component this={RefList} list={Situations} />
</div>

<style>
</style>
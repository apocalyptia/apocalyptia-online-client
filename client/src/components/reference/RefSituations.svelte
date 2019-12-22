<script>
	import { Situations } from '../rules/Situations'
	import RefList from './RefList.svelte'
	import NavButtons from '../../layout/NavButtons.svelte'
</script>

<div class='ref-page'>
	<div class='ref-header'>Situation Rules</div>
	<svelte:component this={RefList} list={Situations} />
</div>

<style>
</style>
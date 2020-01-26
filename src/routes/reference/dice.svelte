<script>
	import { Dice } from '../../components/rules/Dice'
	import RefList from '../../components/ui/reference/RefList.svelte'
</script>

<div class='ref-page'>
	<div class='ref-header'>Dice Rules</div>
	<svelte:component this={RefList} list={Dice} />
</div>
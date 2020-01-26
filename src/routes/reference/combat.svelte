<script>
	import { Combat } from '../../components/rules/Combat'
	import RefList from '../../components/ui/reference/RefList.svelte'
</script>

<div class='ref-page'>
	<div class='ref-header'>Combat Rules</div>
	<svelte:component this={RefList} list={Combat} />
</div>
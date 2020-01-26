<script>
	import { Properties } from '../../components/rules/Properties'
	import RefList from '../../components/ui/reference/RefList.svelte'
</script>

<div class='ref-page'>
	<div class='ref-header'>Property Rules</div>
	<svelte:component this={RefList} list={Properties} />
</div>
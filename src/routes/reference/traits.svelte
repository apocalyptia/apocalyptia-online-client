<script>
	import { TraitList } from '../../components/rules/Traits'
	import RefList from '../../components/ui/reference/RefList.svelte'
</script>

<div class='ref-page'>
	<div class='ref-header'>Trait Rules</div>
	<svelte:component this={RefList} list={TraitList} />
</div>
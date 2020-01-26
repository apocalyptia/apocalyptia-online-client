<script>
	import { Situations } from '../../components/rules/Situations'
	import RefList from '../../components/ui/reference/RefList.svelte'
</script>

<div class='ref-page'>
	<div class='ref-header'>Situation Rules</div>
	<svelte:component this={RefList} list={Situations} />
</div>
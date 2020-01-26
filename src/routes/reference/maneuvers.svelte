<script>
	import { Maneuvers } from '../../components/rules/Maneuvers'
	import RefList from '../../components/ui/reference/RefList.svelte'
</script>

<div class='ref-page'>
	<div class='ref-header'>Maneuver Rules</div>
	<svelte:component this={RefList} list={Maneuvers} />
</div>
<script>
	import { fade } from 'svelte/transition'
	import { AbilityList } from '../../components/rules/Abilities'
	import RefList from '../../components/ui/reference/RefList.svelte'
	
	// TODO: Add remaining ability props to each dropdown.
</script>

<div class='ref-page' in:fade>
	<div class='ref-header'>Ability Rules</div>
	<svelte:component this={RefList} list={AbilityList} />
</div>
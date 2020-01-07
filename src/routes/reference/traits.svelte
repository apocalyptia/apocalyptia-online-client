<script>
	import { fade } from 'svelte/transition'
	import { TraitList } from '../../components/rules/Traits'
	import RefList from '../../components/ui/reference/RefList.svelte'
</script>

<div class='ref-page' in:fade>
	<div class='ref-header'>Trait Rules</div>
	<svelte:component this={RefList} list={TraitList} />
</div>
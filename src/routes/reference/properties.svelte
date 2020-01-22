<script>
	import { fade } from 'svelte/transition'
	import { Properties } from '../../components/rules/Properties'
	import RefList from '../../components/ui/reference/RefList.svelte'
</script>

<div class='ref-page' in:fade>
	<div class='ref-header'>Property Rules</div>
	<svelte:component this={RefList} list={Properties} />
</div>
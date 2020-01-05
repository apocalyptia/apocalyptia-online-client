<script>
	import { fade } from 'svelte/transition'
	import { Situations } from '../../components/rules/Situations'
	import RefList from '../../components/ui/RefList.svelte'
</script>

<div class='ref-page' in:fade>
	<div class='ref-header'>Situation Rules</div>
	<svelte:component this={RefList} list={Situations} />
</div>
<script>
	import { fade } from 'svelte/transition'
	import { Dice } from '../../components/rules/Dice'
	import RefList from '../../components/ui/RefList.svelte'
</script>

<div class='ref-page' in:fade>
	<div class='ref-header'>Dice Rules</div>
	<svelte:component this={RefList} list={Dice} />
</div>
<script>
	import RefList from './RefList.svelte'
	import NavButtons from '../NavButtons.svelte'

	export let list 
</script>


<div class='ref-page'>
	<div class='ref-header'>{list} Rules</div>
	<svelte:component this={RefList} {list} />
</div>
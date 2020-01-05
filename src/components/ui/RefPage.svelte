<script>
	import RefList from './RefList.svelte'
	import NavButtons from './NavButtons.svelte'

	export let list
</script>

<div class='ref-page'>
	<svelte:component this={RefList} {list} />
</div>

<style>
</style>
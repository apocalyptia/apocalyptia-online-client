<script>
	import CreationStepsList from 'rules/lists/CreationStepsList.js'
	import NavBar from 'components/character/creator/NavBar.svelte'
	import characterStore from 'stores/characterStore.js'
</script>


<div id='character-creator' class='page-body'>
	<svelte:component this={CreationStepsList[$characterStore.meta.step]}	/>
</div>
<NavBar />


<style>
	#character-creator {
		bottom: var(--square);
	}
</style>
<script>
	import Character from 'classes/Character.js'
	import CreationStepsList from 'rules/lists/CreationStepsList.js'
	import NavBar from 'components/character/creator/NavBar.svelte'
	import characterStore from 'stores/characterStore.js'
	import { onMount } from 'svelte'

	onMount(_ => $characterStore = new Character())
</script>


<div id='character-creator' class='page-body'>
	<svelte:component this={CreationStepsList[$characterStore.meta.step]}	/>
</div>
<NavBar />
<script>
	import Character from 'classes/Character.js'
	import NavBar from 'views/character/creator/NavBar.svelte'
	import Creator from 'rules/Creator.js'
	import { character } from 'stores/characterStore.js'
	import { onMount } from 'svelte'

	onMount(_ => {
		$character = new Character()
		document.getElementById('creator-page').scrollTop = 0
	})
</script>


<div id='creator-page' class='creator-page'>
	<svelte:component
		this={Creator[$character.meta.step].content}
		creator={Creator}
	/>
</div>
<NavBar />


<style>
	.creator-page {
		bottom: var(--std-input-height);
		left: 0;
		overflow: scroll;
		padding: var(--std-padding);
		position: absolute;
		right: 0;
		top: 0;
		margin-top: var(--square);
	}
</style>
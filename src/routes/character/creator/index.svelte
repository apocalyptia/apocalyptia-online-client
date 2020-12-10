<script>
	import Character from 'classes/Character.js'
	import Abilities from 'creator/abilities.svelte'
	import Description from 'creator/description.svelte'
	import Finalize from 'creator/finalize.svelte'
	import Gear from 'creator/gear.svelte'
	import NavBar from 'views/character/creator/NavBar.svelte'
	import Properties from 'creator/properties.svelte'
	import Skills from 'creator/skills.svelte'
	import Traits from 'creator/traits.svelte'
	import { character } from 'stores/characterStore.js'
	import { afterUpdate, onMount } from 'svelte'

	onMount(_ => $character = new Character())

	afterUpdate(_ => {
		window.scrollTo(0, 500)
		console.log('SCROLL!')
	})

	$: step = $character.meta.step
</script>


<div class='creator-page page-body'>
	{#if step == 0}
		<Description />
	{:else if step == 1}
		<Traits />
	{:else if step == 2}
		<Skills />
	{:else if step == 3}
		<Properties />
	{:else if step == 4}
		<Abilities />
	{:else if step == 5}
		<Gear />
	{:else}
		<Finalize />
	{/if}
</div>
<NavBar />


<style>
	.creator-page {
		bottom: var(--std-input-height);
		top: 0;
		margin-top: var(--square);
	}
</style>
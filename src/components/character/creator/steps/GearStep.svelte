<script>
	import CreationProcess from '/src/rules/CreationProcess.js'
	import ExplanationBlock from '/src/components/character/creator/ExplanationBlock.svelte'
	import PageHeader from '/src/components/character/creator/PageHeader.svelte'
	import StartingGearList from '/src/components/character/creator/StartingGearList.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import { onMount } from 'svelte'

	function randomGear() {
		$characterStore = $characterStore.randomGear()
		$characterStore = $characterStore.creationCanProceed()
		console.log($characterStore.gear.equipment.inventory)
	}

	onMount(() => {
		$characterStore = $characterStore.creationCanProceed()
		console.log($characterStore.gear.equipment.inventory)
	})
</script>


<div class="gear-step-page">
	<fieldset>
		<PageHeader chapter={'Gear'} />
		<ExplanationBlock rule={CreationProcess.gear.description} />
		{#if $characterStore.gear.equipment.inventory.length}
			<StartingGearList />
		{:else}
			<div class='btn-row'>
				<button class="small-cntr-btn" on:click={randomGear}>Random</button>
			</div>
		{/if}
	</fieldset>
</div>


<style>
	.small-cntr-btn {
		height: var(--square);
	}
</style>

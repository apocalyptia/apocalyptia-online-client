<script>
	import CreationProcess from '$rules/CreationProcess.js'
	import ExplanationBlock from '$components/character/creator/ExplanationBlock.svelte'
	import PageHeader from '$components/character/creator/PageHeader.svelte'
	import StartingGearList from '$components/character/creator/StartingGearList.svelte'
	import characterStore from '$stores/characterStore.js'
	import { onMount } from 'svelte'

	function randomGear() {
		console.log($characterStore)
		$characterStore = $characterStore.randomGear()
		$characterStore = $characterStore.creationCanProceed()
	}

	onMount(() => $characterStore = $characterStore.creationCanProceed())
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

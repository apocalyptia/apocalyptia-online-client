<script>
	import AbilityModalItem from 'views/character/creator/AbilityModalItem.svelte'

	export let ability, MasterAbilityList, options

	let optionList = MasterAbilityList.filter(a => a.name == ability.name)

	ability = MasterAbilityList.filter(a => a.name == ability.name)[0]
</script>


<div class='options-section'>
	{#if options}
		{#each optionList as ability}
			<AbilityModalItem {ability} />
		{/each}
	{:else}
		<AbilityModalItem {ability} />
	{/if}
</div>


<style>
	.options-section {
		width: 100%;
	}
</style>
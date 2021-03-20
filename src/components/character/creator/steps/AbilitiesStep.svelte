<script>
	import Ability from '/src/classes/Ability.js'
	import AbilitiesList from '/src/rules/lists/abilities/AbilitiesList.js'
	import AbilityGroup from '/src/components/character/creator/abilities/AbilityGroup.svelte'
	import Creation from '/src/rules/Creation.js'
	import CurrentAbilities from '/src/components/character/creator/abilities/CurrentAbilities.svelte'
	import ExplanationBlock from '/src/components/character/creator/ExplanationBlock.svelte'
	import PageHeader from '/src/components/character/creator/PageHeader.svelte'
	import PointsRemaining from '/src/components/character/creator/PointsRemaining.svelte'
	import RandomAbilities from '/src/rules/random/RandomAbilities.js'
	import ResetAndRandomButtonRow from '/src/components/buttons/ResetAndRandomButtonRow.svelte'
	import characterStore from '/src/stores/characterStore.js'
	import { afterUpdate } from 'svelte'

	afterUpdate(_ => {
		Creation.proceedCheck($characterStore)
		$characterStore = $characterStore
	})

	$: remainingXP = $characterStore.properties.experience.current

	let MasterAbilityList = AbilitiesList.masterList
</script>


<div class='abilities-step-page'>
	<PageHeader chapter={'Abilities'} step={$characterStore.meta.step} />
	<ExplanationBlock rule={Ability} />
	<PointsRemaining points={remainingXP} />
	{#if $characterStore.abilities.length}
		<div class='section-card'>
			<CurrentAbilities />
		</div>
	{/if}
	<div class='abilities-list'>
		{#each AbilitiesList.groups as group}
			<AbilityGroup {group} {MasterAbilityList}/>
		{/each}
	</div>
	<ResetAndRandomButtonRow
		reset={_ => $characterStore = $characterStore.resetAbilities()}
		random={_ => $characterStore = RandomAbilities($characterStore)}
	/>
</div>


<style>
	.abilities-list {
		width: 100%;
	}
</style>
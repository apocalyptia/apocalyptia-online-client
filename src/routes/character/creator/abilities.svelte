<script>
	import Abilities from 'rules/Abilities.js'
	import AbilitiesList from 'rules/lists/AbilitiesList.js'
	import AbilityGroup from 'components/character/creator/AbilityGroup.svelte'
	import ResetAndRandomButtonRow from 'components/character/creator/ResetAndRandomButtonRow.svelte'
	import CurrentAbilities from 'components/character/creator/CurrentAbilities.svelte'
	import Creation from 'rules/Creation.js'
	import ExplanationBlock from 'components/character/creator/ExplanationBlock.svelte'
	import PageHeader from 'components/character/creator/PageHeader.svelte'
	import PointsRemaining from 'components/character/creator/PointsRemaining.svelte'
	import RandomAbilities from 'rules/random/RandomAbilities.js'
	import { characterStore } from 'stores/characterStore.js'

	let MasterAbilityList = AbilitiesList.masterList

	$: remainingXP = $characterStore.properties.xp.current
</script>


<div class='abilities-step-page'>
	<PageHeader chapter={'Abilities'} step={$characterStore.meta.step} />
	<ExplanationBlock rule={Abilities} />
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
		reset={_ => $characterStore = Creation.resetAbilities($characterStore)}
		random={_ => $characterStore = RandomAbilities($characterStore)}
	/>
</div>


<style>
	.abilities-list {
		width: 100%;
	}
</style>
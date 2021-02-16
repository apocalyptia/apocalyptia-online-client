<script>
	import Ability from 'classes/Ability.js'
	import AbilitiesList from 'rules/lists/abilities/AbilitiesList.js'
	import AbilityGroup from 'components/character/creator/abilities/AbilityGroup.svelte'
	import Creation from 'rules/Creation.js'
	import CurrentAbilities from 'components/character/creator/abilities/CurrentAbilities.svelte'
	import ExplanationBlock from 'components/character/creator/ExplanationBlock.svelte'
	import PageHeader from 'components/character/creator/PageHeader.svelte'
	import PointsRemaining from 'components/character/creator/PointsRemaining.svelte'
	import RandomAbilities from 'rules/random/RandomAbilities.js'
	import ResetAndRandomButtonRow from 'components/character/creator/ResetAndRandomButtonRow.svelte'
	import SaveCharacter from 'database/characters/SaveCharacter.js'
	import characterStore from 'stores/characterStore.js'
	import playerStore from 'stores/playerStore.js'

	let MasterAbilityList = AbilitiesList.masterList

	$: remainingXP = $characterStore.properties.xp.current

	const resetAbilities = _ => {
		$characterStore = Creation.resetAbilities($characterStore)
		SaveCharacter()
	}

	const randomAbilities = _ => {
		$characterStore = RandomAbilities($characterStore)
		SaveCharacter()
	}
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
	<ResetAndRandomButtonRow reset={resetAbilities} random={randomAbilities} />
</div>


<style>
	.abilities-list {
		width: 100%;
	}
</style>
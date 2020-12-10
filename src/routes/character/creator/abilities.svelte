<script>
	import Abilities from 'rules/Abilities.js'
	import AbilitiesList from 'lists/AbilitiesList.js'
	import AbilityGroup from 'views/character/creator/AbilityGroup.svelte'
	import ButtonRow from 'views/character/creator/ButtonRow.svelte'
	import CurrentAbilities from 'views/character/creator/CurrentAbilities.svelte'
	import ExplanationBlock from 'views/character/creator/ExplanationBlock.svelte'
	import PageHeader from 'views/character/creator/PageHeader.svelte'
	import PointsRemaining from 'views/character/creator/PointsRemaining.svelte'
	import RandomAbilities from 'random/RandomAbilities.js'
	import { beforeUpdate } from 'svelte'
	import { character } from 'stores/characterStore.js'

	let MasterAbilityList = AbilitiesList.masterList

	$: remainingXP = $character.properties.xp.current

	beforeUpdate(_ => $character = $character.updateAbilities())
</script>


<div class='abilities-step-page'>
	<PageHeader chapter={'Abilities'} step={$character.meta.step} />
	<ExplanationBlock rule={Abilities} />
	<PointsRemaining points={remainingXP} />
	{#if $character.abilities.length}
		<div class='section-card'>
			<CurrentAbilities />
		</div>
	{/if}
	<div class='abilities-list'>
		{#each AbilitiesList.groups as group}
			<AbilityGroup {group} {MasterAbilityList}/>
		{/each}
	</div>
	<ButtonRow
		reset={_ => $character = $character.resetAbilities()}
		random={_ => $character = RandomAbilities($character)}
	/>
</div>


<style>
	.abilities-list {
		width: 100%;
	}
</style>
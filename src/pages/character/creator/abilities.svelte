<script>
	import Abilities from '../../../rules/abilities/Abilities'
	import AbilityCard from '../../../views/character/AbilityCard.svelte'
	import AbilityCurrent from '../../../views/character/AbilityCurrent.svelte'
	import AbilityGroup from '../../../views/character/AbilityGroup.svelte'
	import NavBar from '../../../views/widgets/NavBar.svelte'
	import { beforeUpdate } from 'svelte'
	import { character } from '../../../stores/characterStore'

	let MasterAbilityList = Abilities.masterList

	const resetAbilities = () => {
		for (let a = 0; a < $character.abilities.length; ++a) {
			$character.abilities[a].taken = 0
		}
	}

	beforeUpdate(() => {
		$character.abilities = MasterAbilityList.filter(ability => ability.taken)
		$character = Abilities.remainingXP($character)
	})
</script>


<svelte:head>
	<title>Apocalyptia Online Character Creator - Abilities</title>
</svelte:head>
<div class='abilities-step'>
	<h1>Abilities</h1>
	<div class='explanation'>
		{#each Abilities.explanation as line}
			<p>{line}</p>
		{/each}
		<p>Buy Abilities for your Character using XP, or save some or all of your starting XP for later.</p>
	</div>
	<div class='remaining'>
		<h3>Remaining: {$character.props.experience.remaining}</h3>
	</div>
	{#if $character.abilities.length}
		<div class='section-card'>
			<AbilityCurrent {MasterAbilityList}/>
		</div>
	{/if}
	<div class='abilities-list'>
		{#each Abilities.groups as group, index}
			<AbilityGroup {group} {MasterAbilityList}/>
		{/each}
	</div>
	<div class='btn-row'>
		<button class='small-cntr-btn' on:click={resetAbilities}>Reset</button>
	</div>
</div>
<NavBar links={{back: '/character/creator/properties', next: '/character/creator/gear'}} />


<style>
	.abilities-list {
		width: 100%;
	}
</style>
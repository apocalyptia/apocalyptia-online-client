<script>
	import Abilities from 'rules/Abilities.js'
	import AbilitiesList from 'lists/AbilitiesList.js'
	import AbilityCurrent from 'views/character/AbilityCurrent.svelte'
	import AbilityGroup from 'views/character/AbilityGroup.svelte'
	import RandomAbilities from 'random/RandomAbilities.js'
	import { beforeUpdate } from 'svelte'
	import { character } from 'stores/characterStore.js'

	let MasterAbilityList = AbilitiesList.masterList

	$: remainingXP = $character.properties.experience.current

	$: hasAbilities = $character.abilities.length

	beforeUpdate(_ => {
		$character.abilities = MasterAbilityList.filter(ability => ability.taken)
		$character = $character.calculateRemainingXP()
		console.log(`Abilities.svelte = ${$character.abilities}`)
	})
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Creator - Abilities</title>
</svelte:head>
<div class='creator-page'>
	<h1>Abilities</h1>
	<div class='explanation'>
		{#each Abilities.text as line}
			<p>{line}</p>
		{/each}
		<p>Buy Abilities for your Character using XP, or save some or all of your starting XP for later.</p>
	</div>
	<div class='remaining'>
		<h3>Remaining: {remainingXP}</h3>
	</div>
	{#if hasAbilities}
		<div class='section-card'>
			<AbilityCurrent {MasterAbilityList}/>
		</div>
	{/if}
	<div class='abilities-list'>
		{#each AbilitiesList.groups as group}
			<AbilityGroup {group} {MasterAbilityList}/>
		{/each}
	</div>
	<div class='btn-row'>
		<button class='small-cntr-btn' on:click={() => $character = $character.resetAbilities()}>
			Reset
		</button>
		<button class='small-cntr-btn' on:click={() => {
			$character = RandomAbilities($character)
			console.log(`Post Random = ${$character.abilities}`)		
		}}>
			Random
		</button>
	</div>
</div>


<style>
	.abilities-list {
		width: 100%;
	}
</style>
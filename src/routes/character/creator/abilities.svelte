<script>
	import Abilities from 'rules/Abilities.js'
	import AbilitiesList from 'lists/AbilitiesList.js'
	import AbilityGroup from 'views/character/creator/AbilityGroup.svelte'
	import CurrentAbilities from 'views/character/creator/CurrentAbilities.svelte'
	import RandomAbilities from 'random/RandomAbilities.js'
	import { beforeUpdate } from 'svelte'
	import { character } from 'stores/characterStore.js'

	let MasterAbilityList = AbilitiesList.masterList

	$: remainingXP = $character.properties.experience.current

	beforeUpdate(_ => $character = $character.updateAbilities())
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
	<div class='btn-row'>
		<button class='small-cntr-btn' on:click={_ => $character = $character.resetAbilities()}>
			Reset
		</button>
		<button class='small-cntr-btn' on:click={_ => $character = RandomAbilities($character)}>
			Random
		</button>
	</div>
</div>


<style>
	.abilities-list {
		width: 100%;
	}
</style>
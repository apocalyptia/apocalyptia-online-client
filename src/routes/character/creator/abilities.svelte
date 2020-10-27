<script>
	import Abilities from 'lists/abilities/Abilities.js'
	import AbilityCurrent from 'views/character/AbilityCurrent.svelte'
	import AbilityGroup from 'views/character/AbilityGroup.svelte'
	import { beforeUpdate } from 'svelte'
	import { character } from 'stores/characterStore.js'

	let MasterAbilityList = Abilities.masterList

	const random = _ => $character = Abilities.random($character)

	const reset = _ => $character = Abilities.reset($character)

	beforeUpdate(_ => {
		$character.abilities = MasterAbilityList.filter(ability => ability.taken)
		$character = Abilities.remainingXP($character)
	})
</script>


<svelte:head>
	<title>Apocalyptia Online - Character Creator - Abilities</title>
</svelte:head>
<div class='creator-page'>
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
		<button class='small-cntr-btn' on:click={reset}>
			Reset
		</button>
		<button class='small-cntr-btn' on:click={random}>
			Random
		</button>
	</div>
</div>


<style>
	.abilities-list {
		width: 100%;
	}
</style>
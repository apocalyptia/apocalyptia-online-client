<script>
	import { beforeUpdate } from 'svelte'
	import { character } from '../../stores'
	import { ToggleVisible } from '../helpers/ToggleVisible'
	import Abilities, {
		AbilitiesExplanation,
		AbilityGroups
	} from '../rules/Abilities'
	import AbilityCurrent from '../ui/creator/AbilityCurrent.svelte'
	import AbilityModal from '../ui/creator/AbilityModal.svelte'


	let spentXP = 0

	const getRemaining = () => $character.properties.experience.score - spentXP

	let remaining = getRemaining()

	let xpGroups = [...AbilityGroups]

	const resetAbilities = () => {
		for (let a = 0; a < $character.abilities.length; ++a) {
			$character.abilities[a].taken = 0
		}
	}

	let MasterAbilityList = Abilities

	beforeUpdate(() => {
		$character.abilities = MasterAbilityList.filter(ability => ability.taken)
		console.log('Character Abilities: ', $character.abilities)
	})
</script>

<div class='abilities-step'>
	<div class='step-title'><h2>Abilities</h2></div>
	<div class='explanation'><p>{AbilitiesExplanation}</p></div>
	<div class='remaining'><h3>Starting XP Remaining: {remaining}</h3></div>
	{#if $character.abilities.length}
		<div class='section-card'>
			<AbilityCurrent />
		</div>
	{/if}
	<div class='section-card'>
		<div class='abilities-list'>
			{#each MasterAbilityList as ability, index}
				{#if index == 0 || ability.xp != MasterAbilityList[index-1].xp}
					<div class='xp-group-title'>{ability.xp}XP Abilities</div>
				{/if}
					<div class='ability-card' on:click={() => MasterAbilityList = ToggleVisible(ability, MasterAbilityList)}>
						<div class='card-row'>
							<span class='ability-name'>{ability.name}
								{#if ability.options[0] != ""}
									:&nbsp;{ability.options[0].name}
								{/if}
							</span>
							<span class='ability-taken'>Taken: {ability.taken}</span>
						</div>
						<div class='card-row'>
							<span class='ability-description'>{ability.description}</span>
						</div>
					</div>
				{#if ability.visible == true}
					<AbilityModal on:close='{() => MasterAbilityList = ToggleVisible(ability, MasterAbilityList)}' {ability} />
				{/if}
			{/each}
		</div>
	</div>
	<div class='button-row'>
		<button on:click={resetAbilities}>Reset Abilities</button>
	</div>
</div>

<style>
	.explanation {
		padding: 1rem;
	}
	.abilities-step {
		text-align: left;
	}
	.abilities-list {
		width: 100%;
	}
	.remaining,
	.button-row {
		text-align: center;
	}
	.ability-card {
		margin: 1rem 0;
	}
	.card-row {
		display: flex;
		justify-content: space-between;
	}
	.ability-name{
		flex: 2;
		font-weight: bold;
		text-decoration: underline;
	}
	.ability-taken {
		flex: 1;
		font-weight: bold;
	}
</style>
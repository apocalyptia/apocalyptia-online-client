<script>
	import { character } from '../../stores'
	import { HideShow } from '../helpers/HideShow'
	import 
		Abilities,
	{
		AbilitiesExplanation,
		AbilitiesList,
		AbilityGroups
	} from '../rules/Abilities'
	import AbilityCard from '../ui/creator/AbilityCard.svelte'
	import AbilityCurrent from '../ui/creator/AbilityCurrent.svelte'


	let spentXP = 0

	const getRemaining = () => $character.properties.experience.score - spentXP

	let xpGroups = [...AbilityGroups]
	let DisplayList = [...Abilities]
	let CurrentAbilities = []

	const resetAbilities = () => {
		for (let a = 0; a < $character.abilities.length; ++a) {
			$character.abilities[a].taken = 0
		}
	}


	let remaining = getRemaining()
</script>

<div class='abilities-step'>
	<div class='step-title'>
		<h2>Abilities</h2>
	</div>
	<div class='explanation'>
		<p>{AbilitiesExplanation}</p>
	</div>
	<div class='remaining'>
		<h3>Starting XP Remaining: {remaining}</h3>
	</div>
	{#if $character.abilities.length}
		<div class='section-card'>
			<AbilityCurrent />
		</div>
	{/if}
	<div class='section-card'>
		<div class='abilities-list'>
			{#each xpGroups as group}
				<div class='xp-group-section'>
					<div
						class='xp-group-title'
						on:click={() => xpGroups = HideShow(group, xpGroups)}
					>
						{group.name}XP Abilities
					</div>
					{#if group.visible}
						{#each group.list as ability}
							<AbilityCard {ability} />
						{/each}
					{/if}
				</div>
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
	.xp-group-section {
		border: 1px solid lime;
		padding: 1rem;
	}
	.xp-group-title {
		font-size: 1.25rem;
		text-align: center;
	}
	.abilities-step {
		text-align: left;
	}
	.abilities-list {
		width: 100%;
	}
	.remaining {
		text-align: center;
	}
	.button-row {
		text-align: center;
	}
</style>
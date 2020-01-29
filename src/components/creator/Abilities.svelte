<script>
	import 
		Abilities,
	{
		Ability,
		MasterAbilityList,
		AbilityGroups
	} from '../rules/Abilities'
	import { HideShow } from '../../helpers/HideShow'
	import { character } from '../../stores'
	import AbilityCard from '../ui/creator/AbilityCard.svelte'
	import AbilityCurrent from '../ui/creator/AbilityCurrent.svelte'
	import { AbilitiesExplanation } from '../rules/Abilities'


	let spentXP = 0

	const getRemaining = () => $character.properties.intellect.score - spentXP

	let xpGroups = [...AbilityGroups]
	let DisplayList = [...Abilities]
	let CurrentAbilities = []


	for (let x = 0; x < DisplayList.length; ++x) {
		for (let y = 0; y < MasterAbilityList.length; ++y) {
			if (DisplayList[x].name == MasterAbilityList[y].name) {
				DisplayList[x].id = MasterAbilityList[y].id
			}
		}
	}

	const spentXPTotal = () => {
		spentXP = $character.abilities.reduce((t, n) => t += (n.taken * n.xp), 0)
		remaining = $character.properties.intellect.score = spentXP
	}

	const resetAbilities = () => {
		for (let a = 0; a < $character.abilities.length; ++a) {
			$character.abilities[a].taken = 0
		}
	}

	const syncLists = () => {
		// resetMaster()
		for (let a = 0; a < ModelList.length; ++a) {
			for (let d = 0; d < DisplayList.length; ++d) {
				DisplayList[d].taken = parseInt(DisplayList[d].taken)
				if (a == DisplayList[d].id) {
					ModelList[a].taken = DisplayList[d].taken
				}
			}
		}
	}

	const resetMaster = () => {
		for (let a = 0; a < MasterAbilityList.length; ++a) {
			MasterAbilityList[a].taken = 0
		}
	}

	const modifyAbilities = () => {
		$character.abilities = []
		aloop: for (let a = 0; a < MasterAbilityList.length; ++a) {
			for (let d = 0; d < DisplayList.length; ++d) {
				DisplayList[d].taken = parseInt(DisplayList[d].taken)
				if (DisplayList[d].name == MasterAbilityList[a].name) {
					if (DisplayList[d].options.length == 1) {
						MasterAbilityList[a].taken = DisplayList[d].taken
						if (DisplayList[d].taken) $character.abilities.push(DisplayList[d])
						continue aloop
					}
					else if (DisplayList[d].options.length > 1) {
						if (MasterAbilityList[a].options[0].name == DisplayList[d].options[DisplayList[d].selection].name) {
							MasterAbilityList[a].taken = DisplayList[d].taken
							if (DisplayList[d].taken) {
								$character.abilities.push(MasterAbilityList[a])
								let abilityOptions = DisplayList[d].options
								let remainingOptions = DisplayList[d].options.filter(f => f.name != MasterAbilityList[a].options[0].name)
								DisplayList.splice(
									d, 1,
									new Ability(
										MasterAbilityList[a].name,
										MasterAbilityList[a].description,
										MasterAbilityList[a].max,
										MasterAbilityList[a].xp,
										MasterAbilityList[a].taken,
										MasterAbilityList[a].options
									)
								)
								let incrementer = 0
								for (let o = 0; o < remainingOptions.length; ++o) {
									if (MasterAbilityList[a+o+1].name == DisplayList[d].name) {
										if (MasterAbilityList[a+o+1].taken) {
											$character.abilities.push(MasterAbilityList[a+o])
											DisplayList.splice(
												d+o+1, 0,
												new Ability(
													MasterAbilityList[a].name,
													MasterAbilityList[a].description,
													MasterAbilityList[a].max,
													MasterAbilityList[a].xp,
													MasterAbilityList[a+o+1].taken,
													MasterAbilityList[a+o+1].options
												)
											)
											remainingOptions.filter(r => r.name != MasterAbilityList[a+o+1].options[0].name)
											incrementer = o
										}
										else {
											console.log('kill it')
											DisplayList.splice(d+o+1, 1)
										}
									}
								}
								if (remainingOptions.length) {
									DisplayList.splice(
										d+incrementer, 0,
										new Ability(
											MasterAbilityList[a].name,
											MasterAbilityList[a].description,
											MasterAbilityList[a].max,
											MasterAbilityList[a].xp,
											0,
											remainingOptions
										)
									)
								}
								a += abilityOptions.length
								continue aloop
							}
						}
					}
				}
			}
		}
		console.log($character.abilities)
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
		<h3>XP Remaining: {remaining}</h3>
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
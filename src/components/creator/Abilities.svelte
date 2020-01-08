<script>
	import { fade } from 'svelte/transition'
	import { Ability, AbilityList, MasterAbilityList } from '../rules/Abilities'
	import { SkillList } from '../rules/Skills'
	import { character } from '../../stores'

	$: remaining = $character.props.xp.score - $character.abilities.reduce((t, n) => t += (n.taken * n.xp), 0)

	let DisplayList = [...AbilityList]
	let ModelList = [...MasterAbilityList]

// START EXPERIMENTAL
// if (DisplayList[d].options.length > 1) {
	// DisplayList.splice(
	// 	d+1, 0,
	// 	new Ability(
	// 		DisplayList[d].name,
	// 		DisplayList[d].description,
	// 		DisplayList[d].max,
	// 		DisplayList[d].xp,
	// 		0,
	// 		DisplayList[d].options.filter(f => f.name != MasterAbilityList[a].options[0].name)
	// 	)
	// )
// }
// END EXPERIMENTAL

	const logMaster = () => {
		for (let a = 0; a < MasterAbilityList.length; ++a) {
			console.log('Master = ', MasterAbilityList[a])
		}
	}
	const logDisplay = () => {
		for (let d = 0; d < DisplayList.length; ++d) {
			console.log('Display = ',  DisplayList[d])
		}
	}
	const logTaken = () => {
		for (let a = 0; a < MasterAbilityList.length; ++a) {
			console.log('Taken = ', MasterAbilityList[a].options[0].name, MasterAbilityList[a].taken)
		}
	}
	const logAbility = (ability) => {
		console.log(ability)
	}

	const handleTaken = (ability) => {
		$character.abilities = []
		let tempList = []
		for (let a = 0; a < ModelList.length; ++a) {
			if (ModelList[a].options[0].name == ability.options[ability.selection].name) {
				ModelList[a].taken = ability.taken
				if (ability.taken) tempList.push(ability)
				break
			}
		}
		$character.abilities = [...tempList]
	}

	const handleSelection = (ability) => {
		for (let a = 0; a < MasterAbilityList.length; ++a) {
			if (a == ability.id) {
				MasterAbilityList[a].taken = ability.taken
				break
			}
		}
		// syncLists()
	}



	const syncLists = () => {
		// resetMaster()
		for (let a = 0; a < ModelList.length; ++a) {
			for (let d = 0; d < DisplayList.length; ++d) {
				DisplayList[d].taken = parseInt(DisplayList[d].taken)
				if (a == DisplayList[d].id) {
					console.log('Setting taken for ', ModelList[a])
					ModelList[a].taken = DisplayList[d].taken
				}
			}
		}
	}

	const resetMaster = () => {
		for (let a = 0; a < MasterAbilityList.length; ++a) {
			MasterAbilityList[a].taken = 0
			console.log('Reset: ', MasterAbilityList[a].options[0].name, ' to: ', MasterAbilityList[a].taken)
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
</script>

<div class='abilities-step' in:fade>
	<div class='step-title'>
		<h2>Abilities</h2>
	</div>
	<div class='remaining'>
		<h3>XP Remaining: {remaining}</h3>
	</div>
	<div class='stat-block'>
		<div class='abilities-list'>
			<div class='header-row'>
				<div class='col m-col name-header'>Name</div>
				<div class='col l-col description-header'>Description</div>
				<div class='col s-col max-header'>Max</div>
				<div class='col s-col xp-header'>XP</div>
				<div class='col s-col taken-header'>Taken</div>
			</div>
			{#each DisplayList as ability, index}
					{#if !index || ability.xp != DisplayList[index-1].xp}
						<div class='xp-separator' />
					{/if}
					{#if !index || ability.xp != DisplayList[index-1].xp}
						<div class='xp-header'>{ability.xp}XP Abilities</div>
					{/if}
					<div class='ability-row'>
						<div class='col m-col'>
							<span class='ability-name'>{ability.name}</span>
						</div>
						<div class='col l-col'>
							<span class='description-label'>Descripiton: </span>
							<span class='ability-description'>
								{ability.description}
							</span>
							{#if ability.options[0] != ""}
								<span class='ability-options'>
									<select
										name={ability.name}
										bind:value={ability.selection}
										on:change|preventDefault={(event) => handleTaken(ability)}
									>
										{#each ability.options as option, index}
											<option value={index}>
												{option.name}
											</option>
										{/each}
									</select>
								</span>
							{/if}
						</div>
						<div class='col s-col'>
							<span class='max-label'>Max: </span>
							<span class='ability-max'>{ability.max}</span>
						</div>
						<div class='col s-col'>
							<span class='xp-label'>XP: </span>
							<span class='ability-xp'>{ability.xp}</span>
						</div>
						<div class='col s-col'>
							<span class='taken-label'>Taken: </span>
							<span class='ability-taken'>
								<input
									type='number'
									class='taken-number'
									min=0
									max={ability.max}
									bind:value={ability.taken}
									on:change|preventDefault={(event) => handleTaken(ability)}
								>
							</span>
						</div>
					</div>
					{#if
						index < (DisplayList.length-1) &&
						ability.xp == DisplayList[index+1].xp
					}
						<div class='ab-separator' />
					{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	@media only screen and (max-width: 1000px) {
		.header-row {
			display: none;
		}
		.ability-name,
		.description-label,
		.max-label,
		.xp-label,
		.taken-label {
			font-weight: bold;
		}
		.ability-name {
			text-decoration: underline;
		}
	}
	@media only screen and (min-width: 1000px) {
		.name-header,
		.description-header,
		.max-header,
		.xp-header,
		.taken-header {
			text-decoration: underline;
		}
		.description-label,
		.max-label,
		.xp-label,
		.taken-label {
			display: none;
		}
		.l-col, .m-col, .s-col {
			display: inline-block;
		}
		.l-col {
			width: 50%;
		}
		.m-col {
			width: 20%;
		}
		.s-col {
			text-align: center;
			width: 8%;
		}
	}
	.xp-header {
		font-size: 1.25rem;
		margin-bottom: 1.25rem;
		text-align: center;
		text-decoration: underline;
	}
	.col {
		vertical-align: top;
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
	.ab-separator {
		margin-bottom: 1.5rem;
	}
	.xp-separator {
		border-bottom: 1px solid;
		margin-bottom: 1.25rem;
		padding-bottom: 1.25rem;
		width: 100%;
	}
	.taken-number {
		width: 10vw;
		max-width: 50px;
		height: 1.25rem;
	}
</style>
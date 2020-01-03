<script>
	import { fade } from 'svelte/transition'
	import { Ability, AbilityList, MasterAbilityList } from '../rules/Abilities'
	import { SkillList } from '../rules/Skills'
	import { character } from '../../stores'

	$: remaining = $character.props.xp.score - $character.abilities.reduce((t, n) => n.taken * n.xp, 0)

	let DisplayList = [...AbilityList]

	const modifyAbilities = () => {
		$character.abilities = []
		for (let a = 0; a < MasterAbilityList.length; ++a) {
			MasterAbilityList[a].taken = 0
			for (let d = 0; d < DisplayList.length; ++d) {
				DisplayList[d].taken = parseInt(DisplayList[d].taken)
				if (
					DisplayList[d].taken &&
					DisplayList[d].name == MasterAbilityList[a].name &&
					DisplayList[d].options[DisplayList[d].selection].name == 
					MasterAbilityList[a].options[0].name
				) {
					MasterAbilityList[a].taken = DisplayList[d].taken
					$character.abilities.push(MasterAbilityList[a])

					// START EXPERIMENTAL
					// if (DisplayList[d].options.length > 1) {
					// 	DisplayList.splice(
					// 		d+1, 0,
					// 		new Ability(
					// 			DisplayList[d].name,
					// 			DisplayList[d].description,
					// 			DisplayList[d].max,
					// 			DisplayList[d].xp,
					// 			0,
					// 			DisplayList[d].options.filter(f => f.name != MasterAbilityList[a].options[0].name)
					// 		)
					// 	)
					// }
					// END EXPERIMENTAL

					break
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
				{#if
					DisplayList[index-1] != undefined && 
					DisplayList[index].xp != DisplayList[index-1].xp
				}
					<div class='xp-separator' />
				{/if}
				{#if
					index == 0 ||
					ability.xp != DisplayList[index-1].xp
				}
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
						{#if ability.options[0] != ''}
							<span class='ability-options'>
								<select
									name={ability.name}
									bind:value={ability.selection}
									on:change={modifyAbilities}
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
								min=0
								max={ability.max}
								class='taken-number'
								bind:value={ability.taken}
								on:change={modifyAbilities}
							>
						</span>
					</div>
				</div>
				{#if
					DisplayList[index+1] != undefined &&
					DisplayList[index].xp == DisplayList[index+1].xp
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
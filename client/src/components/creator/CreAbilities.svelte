<script>
	import { fade } from 'svelte/transition'
	import { AbilityList } from '../rules/Abilities'
	import { SkillList } from '../rules/Skills'
	import { character } from '../../stores'

	let Abilities = AbilityList

	let remaining = $character.props.xp.score

	const modifyAbilities = () => {
		remaining = $character.props.xp.score
		$character.abilities = []
		for (let i = 0; i < Abilities.length; i++) {
			if (Abilities[i].taken) {
				$character.abilities.push(Abilities[i])
				for (let t = 0; t < Abilities[i].taken; t++) {
					remaining -= Abilities[i].xp
				}
			}
		}
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
				<div class='m-col name-header'>Name</div>
				<div class='l-col description-header'>Description</div>
				<div class='s-col max-header'>Max</div>
				<div class='s-col xp-header'>XP</div>
				<div class='s-col taken-header'>Taken</div>
			</div>
			{#each Abilities as ability, index}
				<br>
				{#if Abilities[index-1] != undefined && Abilities[index].xp != Abilities[index-1].xp}
					<div class='separator'></div>
					<br>
				{/if}
				<div class='ability-row'>
					<div class='m-col'>
						<span class='ability-name'>{ability.name}</span>
					</div>
					<div class='l-col'>
						<span class='description-label'>Descripiton: </span>
						<span class='ability-description'>{ability.description}</span>
						{#if ability.options.length}
							<span class='ability-options'>
								<select value={ability.options[0]}>
									{#each ability.options as option}
										<option value={option}>{option.name}</option>
									{/each}
								</select>
							</span>
						{/if}
					</div>
					<div class='s-col'>
						<span class='max-label'>Max: </span>
						<span class='ability-max'>{ability.max}</span>
					</div>
					<div class='s-col'>
						<span class='xp-label'>XP: </span>
						<span class='ability-xp'>{ability.xp}</span>
					</div>
					<div class='s-col'>
						<span class='taken-label'>Taken: </span>
						<span class='ability-taken'>
							<select
								class='taken-number'
								bind:value={ability.taken}
								invalid={remaining < 0}
								on:change={modifyAbilities}
							>
								<option value=0>0</option>
								<option value=1>1</option>
								{#if ability.max > 1}
									<option value=2>2</option>
									<option value=3>3</option>
									{#if ability.max > 3}
										<option value=4>4</option>
										<option value=5>5</option>
										<option value=6>6</option>
										{#if ability.max > 6}
											<option value=7>7</option>
											<option value=8>8</option>
											<option value=9>9</option>
										{/if}
									{/if}
								{/if}
							</select>
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	@media only screen and (max-width: 500px) {
		.header-row {
			display: none;
		}
		.l-col, .m-col, .s-col {
			display: block;
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
	@media only screen and (min-width: 500px) {
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
	.abilities-step {
		margin-bottom: 5vh;
		text-align: left;
	}
	.abilities-list {
		width: 100%;
	}
	.remaining {
		text-align: center;
	}
	.separator {
		border-bottom: 1px solid;
		margin-bottom: 10px;
		padding-bottom: 10px;
		width: 100%;
	}
	.taken-number {
		width: 5vw;
	}
</style>
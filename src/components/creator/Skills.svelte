<script>
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import { HideShow } from '../../helpers/HideShow'
	import { character } from '../../stores'
	import { traitMax } from '../rules/Traits'
	import { 
		startingSkillPoints,
		SkillExplanation
	} from '../rules/Skills'


	const skills = Object.keys($character.skills)

	const getRemaining = () => {
		return startingSkillPoints($character) - 
		Object.values($character.skills).reduce(
			(t, { base }) => t += base, 0
		)
	}

	const sumSkills = () => {
		remaining = getRemaining()
	}

	const overMaximum = (s) => {
		return (
			$character.skills[s].base > 
			$character.skills[s].max
		)
	}

	const countSkillPoints = (s) => {
		sumSkills()
		while (remaining < 0 || overMaximum(s)) {
			$character.skills[s].base--
			sumSkills()
		}
		$character.setStat('skills', s)
		$character.updateProperties()
	}

	onMount(() => {
		Object.keys($character.skills).forEach(
			(s) => countSkillPoints(s)
		)
	})

	let skillGroups = []
	Object.keys($character.traits).forEach((t) => {
		skillGroups.push({ name: t, visible: false })
	})

	let remaining = getRemaining()
</script>

<div class='skills-step' in:fade>
	<div class='step-title'>
		<h2>Skills</h2>
	</div>
	<div class='explanation'>
		<p>{SkillExplanation}</p>
	</div>
	<div class='remaining'>
		<h3>Points Remaining: {remaining}</h3>
	</div>
	<div class='skill-list'>
		{#each skillGroups as group}
			<div class='trait-section'>
				<div
					class='parent-trait-title'
					on:click={() => skillGroups = HideShow(group, skillGroups)}
				>
					<h3>{$character.traits[group.name].name} Skills</h3>
				</div>
				{#if group.visible}
					{#each skills as s}
						{#if 
							$character.traits[group.name].name == 
							$character.skills[s].parent
						}
							<br>
							<div class='skill-block'>
								<div class='stat-column name-column'>
									<span class='stat-label'>
										{$character.skills[s].name}
									</span>
								</div>
								<div class='stat-column value-column'>
									<div class='stat-input'>
										<input
											class='slider-input'
											type='range'
											name='{$character.skills[s].name.toLowerCase()}'
											min=0
											max=6
											bind:value={$character.skills[s].base}
											on:input|preventDefault={()=>{countSkillPoints(s)}}
										>
									</div>
									<div class='stat-input'>
										{#each Array(traitMax+1) as _, i}
											<div>{i}</div>
										{/each}
									</div>
								</div>
							</div>
						{/if}
					{/each}
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	@media only screen and (max-width: 500px) {
		.skill-block {
			display: block;
			width: 100%;
		}
		.stat-column {
			width: 100%;
		}
		.trait-section {
			text-align: center;
		}
	}
	@media only screen and (min-width: 500px) {
		.stat-column {
			width: 100%;
		}
	}
	.explanation {
		padding: 1rem;
	}
	.skill-list {
		margin-top: 1rem;
	}
	.trait-section {
		border-width: 2px;
		border-style: dotted;
		display: block;
		justify-content: space-between;
		margin: .5rem;
		padding: 1rem;
		align-items: center;
	}
	.parent-trait-title, 
	.remaining, 
	.stat-label, 
	.stat-column, 
	.stat-input {
		text-align: center;
	}
	.stat-input {
		display: flex;
		flex-wrap: nowrap;
	}
	.stat-input div {
		text-align: center;
		min-width: calc(100%/7);
	}
</style>
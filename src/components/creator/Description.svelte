<script>
	import { character } from '../../stores'
	import RandomRoll from '../helpers/Random'
	import Names, { FemaleNames, MaleNames } from '../helpers/Names'


	const randomName = () => {
		if ($character.description.sex.value == 'Male') {
			$character.description.characterName.value = RandomRoll(MaleNames)
		}
		else if ($character.description.sex.value == 'Female') {
			$character.description.characterName.value = RandomRoll(FemaleNames)
		} 
		else {
			$character.description.characterName.value = RandomRoll(Names)
		}
	}

	const randomHeight = () => {
		const totalInches = Math.ceil((Math.random() * 14) + 60) // 5ft low, 5ft7in median, 6ft2in high
		const feet = Math.floor(totalInches / 12)
		const inches = Math.floor(totalInches % 12)
		$character.description.height.value = `${feet}' ${inches}"`
	}

	const randomWeight = () => {
		$character.description.weight.value = `${Math.ceil(Math.random() * 100) + 100}lbs`
	} // 101 to 200 lbs

	const randomHair = () => {
		$character.description.hair.value = RandomRoll(
			[
				'Auburn',
				'Bald',
				'Black',
				'Blonde',
				'Brunette',
				'Gray',
				'Red',
				'White',
			]
		)
	}

	const randomSkin = () => {
		$character.description.skin.value = RandomRoll(
			[
				'Black',
				'Brown',
				'Olive',
				'Pale',
				'Tan',
				'White',
			]
		) 
	}

	const randomSex = () => {
		$character.description.sex.value = RandomRoll(['Female', 'Male'])
	}

	const randomAge = () => {
		$character.description.age.value = Math.ceil((Math.random() * 33) + 17)
	}

	const randomDescription = () => {
		randomAge()
		randomSex()
		randomSkin()
		randomHair()
		randomWeight()
		randomHeight()
		randomName()
	}

	const resetDescription = () => {
		Object.keys($character.description).forEach((d) => {
			$character.description[d].value = ``
		})
	}

	const descriptions = [
		[
			{ name: "Height", random: randomHeight },
			{ name: "Weight", random: randomWeight }
		],
		[
			{ name: "Skin", random: randomSkin },
			{ name: "Hair", random: randomHair }
		],
		[
			{ name: "Sex", random: randomSex },
			{ name: "Age", random: randomAge }
		]
	]
</script>

<div class='description-step'>
	<div class='step-title'>
		<h2>Description</h2>
	</div>
	<div class='section-card'>
		<span class='stat-label'>Player:</span>
		<input
			type='text'
			class='full-block'
			bind:value={$character.description.playerName.value}
		>
	</div>
	<div class='section-card'>
		<span class='stat-label'>Character:</span>
		<input
			type='text'
			class='full-block'
			bind:value={$character.description.characterName.value}
		>
		<button on:click={randomName}>Random</button>
	</div>
	{#each descriptions as pair}
		<div class='section-card'>
			{#each pair as {name, random}}
				<div class='pair-block'>
					<div class='pair-container'>
						<span class='stat-label'>{name}:</span>
						<input
							type='text'
							class='pair-input'
							bind:value={$character.description[name.toLowerCase()].value}
						>
						<button on:click={random}>Random</button>
					</div>
				</div>
			{/each}
		</div>
	{/each}
	<button class='center-button' on:click={resetDescription}>Reset Description</button>
	<button class='center-button' on:click={randomDescription}>Random Description</button>
</div>
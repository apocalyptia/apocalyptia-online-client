<script>
	import { femaleNames, maleNames } from '..//helpers/lists/names.js'
	import RandomRoll from '../helpers/Random'
	import { character } from '../../stores'

	const randomName = () => {
		if ($character.description.gender.value == 'Male') {
			$character.description.characterName.value = Random(maleNames)
		}
		else if ($character.description.gender.value == 'Female') {
			$character.description.characterName.value = Random(femaleNames)
		} 
		else {
			$character.description.characterName.value = Random([...femaleNames, ...maleNames])
		}
	}

	const randomHeight = () => {
		const totalInches = Math.ceil((Math.random() * 14) + 60) // 5ft low, 5ft7in median, 6ft2in high
		const feet = Math.floor(totalInches / 12)
		const inches = Math.floor(totalInches % 12)
		$character.description.height.value = `${feet}' ${inches}"`
	}

	const randomWeight = () => { $character.description.weight.value = `${Math.ceil(Math.random() * 100) + 100}lbs` } // 101 to 200 lbs

	const randomHair = () => {
		$character.description.hair.value = Random(
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

	const randomSkin = () => { $character.description.skin.value = Random(
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

	const randomGender = () => { $character.description.gender.value = Random(['Female', 'Male']) }

	const randomAge = () => { $character.description.age.value = Math.ceil((Math.random() * 33) + 17) }

	const randomDescription = () => {
		randomAge()
		randomGender()
		randomSkin()
		randomHair()
		randomWeight()
		randomHeight()
		randomName()
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
			{ name: "Gender", random: randomGender },
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
	<button class='center-button' on:click={randomDescription}>Random Character</button>
</div>
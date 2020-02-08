<script>
	import { character } from '../../../stores'
	import Capitalize from '../../helpers/Capitalize'
	import RandomRoll from '../../helpers/Random'
	import Names, { FemaleNames, MaleNames } from '../../helpers/Names'

	const randomName = () => {
		if ($character.description.sex.value == 'Male') {
			$character.description.character.value = RandomRoll(MaleNames)
		}
		else if ($character.description.sex.value == 'Female') {
			$character.description.character.value = RandomRoll(FemaleNames)
		} 
		else {
			$character.description.character.value = RandomRoll(Names)
		}
	}

	const randomHeight = () => {
		const totalInches = Math.ceil((Math.random() * 14) + 60) // 5ft low, 5ft7in median, 6ft2in high
		const feet = Math.floor(totalInches / 12)
		const inches = Math.floor(totalInches % 12)
		$character.description.height.value = `${feet}ft ${inches}in`
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
			{ name: "age", random: randomAge },
			{ name: "sex", random: randomSex }
		],
		[
			{ name: "skin", random: randomSkin },
			{ name: "hair", random: randomHair }
		],
		[
			{ name: "height", random: randomHeight },
			{ name: "weight", random: randomWeight }
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
			bind:value={$character.description.player.value}
		>
	</div>
	<div class='section-card'>
		<span class='stat-label'>Character:</span>
		<input
			type='text'
			class='full-block'
			bind:value={$character.description.character.value}
		>
		<button on:click={randomName}>Random</button>
	</div>
	{#each descriptions as pair, index}
		<div class='section-card'>
			{#each pair as {name, random}}
				<div class='pair-block'>
					<div class='pair-container'>
						<span class='stat-label'>{Capitalize(name)}:</span>
						<input
							type='text'
							class='pair-input'
							bind:value={$character.description[name].value}
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
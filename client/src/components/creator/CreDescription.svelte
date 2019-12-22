<script>
	import { femaleNames, maleNames } from '../../assets/lists/names.js'
	import { CharacterStore } from '../../stores'
	let char
	const unsubscribe = CharacterStore.subscribe(value => { char = value })

	function random(array) { return array[Math.ceil(Math.random() * array.length) - 1] }

	function randomName() {
		if (char.description.gender.value == 'Male') { char.description.characterName.value = random(maleNames) }
		else if (char.description.gender.value == 'Female') { char.description.characterName.value = random(femaleNames) } 
		else { char.description.characterName.value = random([...femaleNames, ...maleNames]) }
	}

	function randomHeight() {
		const totalInches = Math.ceil((Math.random() * 14) + 60) // 5ft low, 5ft7in median, 6ft2in high
		const feet = Math.floor(totalInches / 12)
		const inches = Math.floor(totalInches % 12)
		char.description.height.value = `${feet}' ${inches}"`
	}

	function randomWeight() { char.description.weight.value = `${Math.ceil(Math.random() * 100) + 100}lbs` } // 101 to 200 lbs

	function randomHair() {
		char.description.hair.value = random(
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

	function randomSkin() { char.description.skin.value = random(
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

	function randomGender() { char.description.gender.value = random(['Female', 'Male']) }

	function randomAge() { char.description.age.value = Math.ceil((Math.random() * 33) + 17) }

	function randomDescription() {
		randomAge()
		randomGender()
		randomSkin()
		randomHair()
		randomWeight()
		randomHeight()
		randomName()
	}

	const descriptions = [
		[{ name: "Height", random: randomHeight }, { name: "Weight", random: randomWeight }],
		[{ name: "Skin", random: randomSkin }, { name: "Hair", random: randomHair }],
		[{ name: "Gender", random: randomGender }, { name: "Age", random: randomAge }]
	]
</script>

<div class='step'>
	<div class='step-title'>
		<h2>Description</h2>
	</div>
	<div class='stat-block'>
		<span class='stat-label'>Player:</span>
		<input
			type='text'
			class='player-name'
			bind:value={char.description.playerName.value}
		>
	</div>
	<div class='stat-block'>
		<span class='stat-label'>Character:</span>
		<input
			type='text'
			class='character-name'
			bind:value={char.description.characterName.value}
		>
		<button on:click={randomName}>Random</button>
	</div>
	{#each descriptions as pair}
		<div class='stat-block'>
			{#each pair as {name, random}}
				<div class='half-stat-block'>
					<div class='hs-container'>
						<span class='stat-label'>{name}:</span>
						<input class='half-input' bind:value={char.description[name.toLowerCase()].value}>
						<button on:click={random}>Random</button>
					</div>
				</div>
			{/each}
		</div>
	{/each}
	<div class='stat-block'>
		<button class='random-all' on:click={randomDescription}>Random Character</button>
	</div>
</div>

<style >
	.stat-label {
		display: block;
	}
	.player-name {
		width: 100%;
	}
	.character-name {
		width: 100%;
	}
	input {
		height: 1.75em;
	}
	button {
		height: 1.75em;
		padding: 2px;
	}
	.random-all {
		margin: auto;
		padding: 5px;
	}
	.half-input {
		width: 70%;
	}
	.half-stat-block {
		text-align: center;
		width: 50% ;
	}
	.hs-container {
		display: inline-block;
		text-align: left;
	}
	@media only screen and (max-width: 500px) {
		input {
			display: inline-block;
			width: 100%;
		}
		button {
			display: block;
			float: right;
		}
		.half-stat-block {
			display: block;
			padding: 5px;
			width: 55%;
		}
		.half-input {
			width: 50%;
		}
	}
</style>
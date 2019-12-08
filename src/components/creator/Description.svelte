<script>
	import { femaleNames, maleNames } from '../../assets/lists/Names'
	import { CharacterStore } from '../../rules/Stores'
	let char
	const unsubscribe = CharacterStore.subscribe(value => { char = value })

	function random(array) { return array[Math.ceil(Math.random() * array.length) - 1] }

	function randomName() {
		if (char.description.gender.value == 'Male') { char.description.characterName.value = random(maleNames) }
		else if (char.description.gender.value == 'Female') { char.description.characterName.value = random(femaleNames) } 
		else { char.description.characterName.value = random([...femaleNames, ...maleNames]) }
	}

	function randomHeight() {
		const totalInches = Math.ceil((Math.random() * 18) + 58) // 4'11' low, 5'7' median, 6'4' high
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
</script>

<div class='step'>
	<div class='step-title'>
		<h2>Description</h2>
	</div>
	<div class='stat-block'>
		<span class='stat-label'>Player:</span>
		<input
			type='text'
			bind:value={char.description.playerName.value}
		>
	</div>
	<div class='stat-block'>
		<span class='stat-label'>Character:</span>
		<input bind:value={char.description.characterName.value}>
		<button on:click={randomName}>Random</button>
	</div>
	<div class='stat-block'>
		<div class='half-stat-block'>
			<span class='stat-label'>Height:</span>
			<input class='half-input' bind:value={char.description.height.value}>
			<button on:click={randomHeight}>Random</button>
		</div>
		<div class='half-stat-block'>
			<span class='stat-label'>Weight:</span>
			<input class='half-input' bind:value={char.description.weight.value}>
			<button on:click={randomWeight}>Random</button>
		</div>
	</div>
	<div class='stat-block'>
		<div class='half-stat-block'>
			<span class='stat-label'>Hair:</span>
			<input class='half-input' bind:value={char.description.hair.value}>
			<button on:click={randomHair}>Random</button>
		</div>
		<div class='half-stat-block'>
			<span class='stat-label'>Skin:</span>
			<input class='half-input' bind:value={char.description.skin.value}>
			<button on:click={randomSkin}>Random</button>
		</div>
	</div>
	<div class='stat-block'>
		<div class='half-stat-block'>
			<span class='stat-label'>Gender:</span>
			<input class='half-input' bind:value={char.description.gender.value}>
			<button on:click={randomGender}>Random</button>
		</div>
		<div class='half-stat-block'>
			<span class='stat-label'>Age:</span>
			<input class='half-input' bind:value={char.description.age.value}>
			<button on:click={randomAge}>Random</button>
		</div>
	</div>
	<div class='stat-block'>
		<button class='random-all' on:click={randomDescription}>Random Character</button>
	</div>
</div>

<style >
	@media only screen and (max-width: 600px) {
		.stat-label {
			display: block;
		}
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
	}
	.stat-label {
		display: block;
	}
	input {
		height: 1.75em;
		width: 50% ;
	}
	button {
		height: 1.75em;
		padding: 2px;
	}
	.random-all {
		margin: auto;
		padding: 5px;
	}
	.half-stat-block {
		width: 50% ;
	}
</style>
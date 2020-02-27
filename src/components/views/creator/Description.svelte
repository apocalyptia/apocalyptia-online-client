<script>
import { character } from '../../../stores'
import Capitalize from '../../functions/Capitalize'
import RandomRoll,
	{ 
		RandomName,
		RandomHeight,
		RandomWeight,
		RandomHair,
		RandomSkin,
		RandomSex,
		RandomAge
	} from '../../functions/Random'

const randomName = () => {
	$character.description.character.value = RandomName($character.description.sex.value)
}

const randomHeight = () => $character.description.height.value = RandomHeight()

const randomWeight = () => $character.description.weight.value = RandomWeight()

const randomHair = () => $character.description.hair.value = RandomHair()

const randomSkin = () => $character.description.skin.value = RandomSkin()

const randomSex = () => $character.description.sex.value = RandomSex()

const randomAge = () => $character.description.age.value = RandomAge()

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
		{ name: `age`, random: randomAge },
		{ name: `sex`, random: randomSex }
	],
	[
		{ name: `skin`, random: randomSkin },
		{ name: `hair`, random: randomHair }
	],
	[
		{ name: `height`, random: randomHeight },
		{ name: `weight`, random: randomWeight }
	],
]
</script>


<h1>Description</h1>
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
	&nbsp;
	<button class='small-button' on:click={randomName}>
		Random
	</button>
</div>
{#each descriptions as pair}
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
					<button class='small-button' on:click={random}>
						Random
					</button>
				</div>
			</div>
		{/each}
	</div>
{/each}
<div class='button-row'>
	<button class='center-button' on:click={resetDescription}>
		Reset Description
	</button>
	<button class='center-button' on:click={randomDescription}>
		Random Description
	</button>
</div>


<style>
.pair-container {
	display: inline-block;
	text-align: left;
}
.pair-container input {
	max-width: 45%;
}
.small-button {
	font-size: calc(var(--base-unit) * .75);
	height: var(--double-unit);
	max-width: 45%;
	padding: var(--third-unit);
}
.pair-input {
	width: 45%;
}
@media only screen and (max-width: 768px) {
	.pair-block {
		display: block;
		padding: var(--third-unit);
		width: 55%;
	}
	.stat-label {
		display: block;
	}
}
@media only screen and (min-width: 768px) {
	.pair-block {
		width: 50%;
	}
}
.full-block {
	display: block;
	width: 100%;
}
.button-row {
	text-align: center;
}
</style>
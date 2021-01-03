<script>
	import d6Roll from 'rules/random/d6Roll.js'

	let randomReady = true

	let rollCount = 0

	let roll = 1

	let mod = 0

	let total = roll + mod

	$: result = total

	let setInterval_ID

	const makeRoll = _ => {
		if (randomReady) {
			randomReady = false
			rollCount = Math.ceil(Math.random() * 37) + 2
			setInterval_ID = setInterval(diceRoller, 50)
		}
	}

	const diceRoller = _ => {
		roll = d6Roll()
		if (roll[0] == 1 && roll[1] == 1) total = 'Botch!'
		else total = roll.reduce((total, num) => total + num, 0) + mod
		if (roll[0] == 6) total = `Explode! ${total}`
		if (rollCount-- == 0) {
			clearInterval(setInterval_ID)
			randomReady = true
		}
	}
</script>


<div class='item-category'>
	<div class='category-header'>
		<div class='category-name'>d6 Roll</div>
		<button on:click={_ => makeRoll()}>Random</button>
	</div>
	<div class='item-content'>
		<p class='roll'>
			Die Roll{roll.length > 1 ? 's' : ''}: {roll}
		</p>
		<p>
			Modifier: 
			<input type='number' 
				class='mod' 
				bind:value='{mod}'
			>
		</p>
		<p class='result'>
			Result: 
			<span class='total'>
				{result}
			</span>
		</p>
	</div>
</div>


<style>
	.item-category {
		border: var(--std-border) var(--pri-color) solid;
		padding: var(--std-padding);
		margin-bottom: var(--std-margin);
	}
	.category-header {
		display: flex;
	}
	.category-name {
		align-items: center;
		display: flex;
		flex: 3;
		font-size: var(--s125);
		font-weight: bold;
	}
	button {
		flex: 1;
	}
	.item-content {
		padding-top: var(--std-margin);
	}
	.result {
		font-size: var(--s150);
		font-weight: bold;
	}
	.mod {
		margin: var(--std-margin) 0;
		width: 6ch;
	}
</style>
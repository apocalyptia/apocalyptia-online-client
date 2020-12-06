<script>
	import d6Roll from 'random/d6Roll.js'

	let roll = 1

	let mod = 0

	$: result = roll + mod

	let setInterval_ID

	const makeRoll = _ => {
		setInterval_ID = setInterval(diceRoller, 50)
	}

	let rolls = 0

	const diceRoller = _ => {
		let d6 = d6Roll()
		if (d6 == -666) d6 = 1
		roll = d6
		rolls++
		if (rolls == 20) {
			clearInterval(setInterval_ID)
			rolls = 0
		}
	}
</script>


<div class='item-category'>
	<div class='category-header'>
		<div class='category-name'>d6 Roll</div>
		<button on:click={_ => makeRoll()}>Random</button>
	</div>
	<div class='item-content'>
		<p class='roll'>Die Roll: {roll}</p>
		<p>Modifier: <input type='number' 
							class='mod' 
							bind:value='{mod}'>
		</p>
		<p class='result'>Result: {result}</p>
	</div>
</div>


<style>
	.item-category {
		border: var(--std-border) var(--pri-color) solid;
		padding: var(--std-padding);
		margin: var(--std-margin) 0;
	}
	.category-header {
		display: flex;
	}
	.category-name {
		align-items: center;
		display: flex;
		flex: 2;
		font-size: var(--s125);
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
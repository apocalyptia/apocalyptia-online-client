<script>
	import d6Roll from 'rules/random/d6Roll.js'
	import DiceButton from 'components/buttons/DiceButton.svelte'

	let roll = [6], mod = 0, total = 0

	const rollResult = _ => {
		roll = d6Roll()
		if (roll[0] == 1 && roll[1] == 1) total = 'Botched!'
		else total = roll.reduce((acc, num) => acc + num, 0) + mod
		if (roll[0] == 6) total = `Exploded! ${total}`
		return roll[roll.length - 1]
	}
</script>


<div class='item-category'>
	<div class='category-header'>
		<div class='category-name'>d6 Roll</div>
		<DiceButton func={rollResult} />
	</div>
	<div class='item-content'>
		<p class='roll'>Dice Roll: {roll}</p>
		<p>Modifier: <input type='number' class='mod' bind:value='{mod}'></p>
		<p class='result'>Result: <span class='total'>{total}</span></p>
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
<script>
	import d6Roll from 'rules/random/d6Roll.js'
	import DiceButton from 'components/buttons/DiceButton.svelte'

	const diceRoller = _ => {
		let rollCount = Math.ceil(Math.random() * 37) + 2
		const setIntervalId = setInterval(_ => {
			factors.roll = d6Roll()
			if (factors.roll[0] == 1 && factors.roll[1] == 1) factors.total = 'Botched!'
			else factors.total = factors.roll.reduce((acc, num) => acc + num, 0) + factors.mod
			if (factors.roll[0] == 6) factors.total = `Exploded! ${factors.total}`
			if (rollCount-- == 0) clearInterval(setIntervalId)
		}, 50)
	}

	const factors = {
		roll: 1,
		mod: 0,
		total: 0
	}
</script>


<div class='item-category'>
	<div class='category-header'>
		<div class='category-name'>d6 Roll</div>
		<DiceButton func={diceRoller} type='Roll' />
	</div>
	<div class='item-content'>
		<p class='roll'>Die Roll{factors.roll > 1 ? 's' : ''}: {factors.roll}</p>
		<p>Modifier: <input type='number' class='mod' bind:value='{factors.mod}'></p>
		<p class='result'>Result: <span class='total'>{factors.total}</span></p>
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
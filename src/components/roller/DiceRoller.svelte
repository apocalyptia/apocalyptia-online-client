<script>
	import d6Roll from '/src/utils/random/dice/d6Roll.js'
	import DiceButton from '/src/components/buttons/DiceButton.svelte'

	let roll = [6]
	let mod = 0
	let total = 0

	function rollResult() {
		roll = d6Roll()
		if (roll[0] === 1 && roll[1] === 1) total = 'Botched!'
		else total = roll.reduce((acc, num) => acc + num, 0) + mod
		if (roll[0] === 6) total = `Exploded! ${total}`
		return roll[roll.length - 1]
	}
</script>

<div class="modifier">Modifier: <input type="number" class="mod" bind:value={mod} /></div>
<div class="result">Result: {total}</div>
<div class="button">
	<DiceButton func={rollResult} />
</div>

<style>
	.modifier {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: var(--s110);
		font-weight: bold;
		margin: var(--margin);
	}
	.mod {
		width: 6ch;
	}
	.result {
		font-size: var(--s110);
		font-weight: bold;
		margin: var(--margin);
		padding-bottom: var(--padding);
		padding-top: var(--padding);
	}
	.button {
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin: var(--margin);
	}
</style>

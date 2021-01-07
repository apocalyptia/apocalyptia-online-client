<script>
	import DiceRoller from 'rules/random/DiceRoller.js'

	let factors = {
		roll: 1,
		mod: 0,
		total: 0
	}

	$: result = factors.total
</script>


<div class='item-category'>
	<div class='category-header'>
		<div class='category-name'>d6 Roll</div>
		<button on:click={_ => factors = DiceRoller(factors)}>Random</button>
	</div>
	<div class='item-content'>
		<p class='roll'>Die Roll{factors.roll.length > 1 ? 's' : ''}: {factors.roll}</p>
		<p>Modifier: <input type='number' class='mod' bind:value='{factors.mod}'></p>
		<p class='result'>Result: <span class='total'>{result}</span></p>
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
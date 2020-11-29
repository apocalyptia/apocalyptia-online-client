<script>
	import d6Roll from 'random/d6Roll.js'

	let roll = 0, mod = 0, result = 0

	const rolld6 = _ => {
		roll = d6Roll()
		if (roll == -666) {
			roll = '1, 1'
			result = 'Botch!'
		}
		else result = roll + mod
	}
</script>


<div class='item-category'>
	<h1>d6 Roll</h1>
	<div class='item-content'>
		<p>
			Modifier: <input type='number' 
							class='mod' 
							bind:value='{mod}'>
		</p>
		<p>Roll: {roll}</p>
		<h1>Result: {result} </h1>
	</div>
	<div class='btn-row'>
		<button on:click={rolld6}>
			Random
		</button>
	</div>
</div>


<style>
	.item-category {
		border: var(--std-border) var(--pri-color) solid;
		padding: var(--std-padding);
		margin: var(--std-margin) 0;
	}
	h1 {
		margin: auto;
	}
	.item-content {
		margin: var(--std-margin) 0;
	}
	.mod {
		width: 6ch;
	}
</style>
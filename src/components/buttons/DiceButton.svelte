<script>
	import d6 from '/src/utils/random/dice/d6.js'

	export let func

	let face = 6

	function runFunc() {
		let rollCount = Math.ceil(Math.random() * 12) + 12
		const setIntervalId = setInterval(() => {
			const result = func()
			if (typeof result === 'number') face = result
			else face = d6()
			if (rollCount-- === 0) clearInterval(setIntervalId)
		}, 50)
	}
</script>

<button class="btn-box square-btn" on:click={runFunc}>
	<div class="dice-icon-box">{face}</div>
</button>

<style>
	.dice-icon-box {
		font-size: var(--s200);
		padding-top: var(--s25);
	}
</style>

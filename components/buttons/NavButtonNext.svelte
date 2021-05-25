<script>
	import characterStore from '/src/stores/characterStore.js'
	import playerStore from '/src/stores/playerStore.js'
	import rulesStore from '/src/stores/rulesStore.js'
	import { beforeUpdate } from 'svelte'

	beforeUpdate(() => $characterStore.proceed = $characterStore.canProceed())

	$: next = () => {
		document.getElementById('character-creator').scrollTo(0, 0)
		if ($characterStore.proceed) $characterStore.step++
		if ($characterStore.step === Object.keys($rulesStore.list.creation).length + 1) {
			$playerStore.saveCharacter($characterStore)
			window.location.href = '/'
		}
	}
</script>


<button on:click={next}
	class='next-btn btn-box { $characterStore.proceed ? `` : `crimson-btn` }'>
	<div class='btn-icon'>
		{ @html $characterStore.proceed ? `&gt;` : `X` }
	</div>
</button>


<style>
	button {
		height: var(--square);
		width: 100%;
	}
</style>
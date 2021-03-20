<script>
	import Creation from '/src/rules/Creation.js'
	import CreationStepsList from '/src/rules/lists/CreationStepsList.js'
	import characterStore from '/src/stores/characterStore.js'
	import playerStore from '/src/stores/playerStore.js'
	import { beforeUpdate } from 'svelte'

	beforeUpdate(_ => $characterStore.meta.proceed = Creation.proceedCheck($characterStore))

	$: next = _ => {
		document.getElementById('character-creator').scrollTo(0, 0)
		if ($characterStore.meta.proceed) $characterStore.meta.step++
		if ($characterStore.meta.step == CreationStepsList.length) {
			$playerStore.saveCharacter($characterStore)
			window.location.href = '/'
		}
	}
</script>


<button on:click={next} class='next-btn btn-box {$characterStore.meta.proceed ? '' : 'crimson-btn' }'>
	<div class='btn-icon'>{@html $characterStore.meta.proceed ? `&gt;` : `X`}</div>
</button>


<style>
	button {
		height: var(--square);
		width: 100%;
	}
</style>
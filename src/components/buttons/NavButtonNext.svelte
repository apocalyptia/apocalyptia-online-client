<script>
	import Creation from 'rules/Creation.js'
	import CreationStepsList from 'rules/lists/CreationStepsList.js'
	import characterStore from 'stores/characterStore.js'
	import { beforeUpdate } from 'svelte'

	beforeUpdate(_ => $characterStore.meta.proceed = Creation.proceedCheck($characterStore))

	$: next = _ => {
		document.getElementById('character-creator').scrollTo(0, 0)
		if ($characterStore.meta.proceed) $characterStore.meta.step++
		if ($characterStore.meta.step == CreationStepsList.length) {
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
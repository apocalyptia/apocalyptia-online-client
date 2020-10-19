<script>
	import OuterClick from 'utils/OuterClick.js'
	import { createEventDispatcher } from 'svelte'

	export let exclude = []

	let child

	const dispatch = createEventDispatcher()

	const ClickOutside = (event) => {
		if (OuterClick(event.target, child, exclude)) {
			dispatch('clickoutside')
		}
	}
</script>


<svelte:body on:click={ClickOutside}/>
<div bind:this={child}>
	<slot/>
</div>
<script>
	import OuterClick from '../../helpers/OuterClick'
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
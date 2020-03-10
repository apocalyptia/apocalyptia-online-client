<script>
import { createEventDispatcher } from 'svelte'
import OuterClick from '../../functions/OuterClick'

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
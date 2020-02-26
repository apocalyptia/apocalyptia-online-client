<script>
import * as sapper from '@sapper/app'
import { createEventDispatcher } from 'svelte'

export let options = []
export let root = '/'
export let routed = false
export let store = {}

const dispatch = createEventDispatcher()

let step = 0

const back = () => {
	if (routed) store.back()
	else navigate(--step)
}

const home = () => {
	sapper.goto(root)
}

const next = () => { 
	if (routed) store.next()
	else navigate(++step)
}

const navigate = () => {
	if (step > options.length -1 || step < 0) sapper.goto(root)
	else dispatch('nav', { selection: options[step].content })
}
</script>


<div class='nav-bar'>
	<button on:click={back}>&lt;</button>
	<button on:click={home}>Home</button>
	<button on:click={next}>&gt;</button>
</div>


<style>
.nav-bar {
	bottom: 0;
	display: flex;
	left: 0;
	position: fixed;
	width: 100%;
}
button {
	flex: 1;
	font-size: 1.25rem;
	font-weight: bold;
}
</style>
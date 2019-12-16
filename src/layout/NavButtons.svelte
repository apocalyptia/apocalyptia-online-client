<script>
    import router from '../routes'
	import { createEventDispatcher } from 'svelte'
	export let screen

	const d = createEventDispatcher()

    function back () { d('message', { number: --screen.step }) }
    
    function home () { router.Home() }

	function next() { d('message', { number: ++screen.step }) }
</script>

<div>
	<button on:click={back}>Back</button>
    <button on:click={home}>Home</button>
	<button on:click={next}>Next</button>
</div>

<style>
	div {
		display: flex;
		flex-direction: row;
		position: fixed;
		left: 0;
		bottom: 0px;
		height: 50px;
		width: 100vw;
	}
	button {
		border: 1px solid;
		width: 50vw;
	}
</style>
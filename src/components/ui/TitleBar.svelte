<script>
	import * as sapper from '@sapper/app'
	import { createEventDispatcher } from 'svelte'

	let duration = '300ms'
	let offset = 0
	let tolerance = 0
	let headerClass = 'pin'
	let lastHeaderClass = 'pin'
	let y = 0
	let lastY = 0

	const dispatch = createEventDispatcher()

	const deriveClass = (y = 0, scrolled = 0) => {
		if (y < offset) return 'pin'
		if (!scrolled || Math.abs(scrolled) < tolerance) return headerClass
		const dir = scrolled < 0 ? 'down' : 'up'
		if (dir === 'up') return 'pin'
		if (dir === 'down') return 'unpin'
		return headerClass
	}

	const updateClass = (y = 0) => {
		const scrolledPxs = lastY - y
		const result = deriveClass(y, scrolledPxs)
		lastY = y
		return result
	}

	const action = (node) => node.style.transitionDuration = duration

	$: {
		headerClass = updateClass(y)
		if (headerClass != lastHeaderClass) dispatch(headerClass)
		lastHeaderClass = headerClass
	}
</script>

<svelte:window bind:scrollY={y} />
<div use:action class={headerClass}>
	<button id='title-bar' class='title-bar' on:click={sapper.goto('/')}>
		<span class='title'>Apocalyptia Online</span>
		<span class='beta'>beta</span>
	</button>
</div>

<style>
	.title-bar {
		height: 3rem;
		margin-bottom: 1rem;
		position: fixed;
		text-align: center;
		top: 0;
		transition: top 0.3s linear;
		width: 100vw;
		z-index: 1;
	}
	.pin {
		transform: translateY(0%);
	}
	.unpin {
		transform: translateY(-100%);
	}
	.title {
		font-size: 1.5rem;
	}
	.beta {
		color: lightcoral;
		border: 1px dotted lightcoral;
		font-size: .75rem;
		padding: .25rem;
	}
</style>
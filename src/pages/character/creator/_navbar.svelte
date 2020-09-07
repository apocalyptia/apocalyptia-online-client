<script>
	import { character } from '../../../stores/characterStore'
	import { goto } from '@roxi/routify'
	import { beforeUpdate, onMount } from 'svelte'
	import Traits from '../../../rules/traits/Traits'
	import Skills from '../../../rules/skills/Skills'

	const pages = [
        '/',
        '/character/creator/description',
        '/character/creator/traits',
        '/character/creator/skills',
        '/character/creator/properties',
        '/character/creator/abilities',
        '/character/creator/gear',
        '/character/creator/sheet',
        '/'
	]

	let current = 1

	let status

	$: nextButton = 'X'

	const back = () => {
		$goto(pages[--current])
	}

	const home = () => {
		current = 1
		$goto('/')
	}

	const next = () => {
		checkStatus()
		if (status == 'go') {
			$goto(pages[++current])
		}
	}

	const checkStatus = () => {
		console.log(current)
		status = 'go'
		if (current == 1 && Object.values($character.desc).some(d => d.value == ``)) status = 'stop'
		else if (current == 2 && Traits.remaining($character) > 0) status = 'stop'
		else if (current == 3 && Skills.remaining($character) > 0) status = 'stop'
		else if (current == 6 && Object.values($character.gear).some(g => g.inventory.length == 0)) status = 'stop'
		if (status == 'go') nextButton = '&rtrif;'
		else nextButton = 'X'
		console.log(status)
	}

	beforeUpdate(() => checkStatus())
	onMount(() => checkStatus())
</script>


<div class='nav-bar'>
	<button on:click={back} class='link-btn nav-button'>&ltrif;</button>
	<button on:click={home} class='link-btn nav-button home-button'>Home</button>
	<button on:click={next} class='link-btn nav-button'>{@html nextButton}</button>
</div>


<style>
	.nav-bar {
		bottom: 0;
		display: flex;
		height: var(--s300);
		left: 0;
		position: fixed;
		width: 100%;
		z-index: 2;
	}
	.nav-button {
		flex: 1;
	}
	.home-button {
		font-size: var(--s125);
	}
</style>
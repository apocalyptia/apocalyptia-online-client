<script>
	import Skills from 'lists/skills/Skills.js'
	import Traits from 'lists/Traits.js'
	import abilities from 'creator/abilities.svelte'
	import description from 'creator/description.svelte'
	import gear from 'creator/gear.svelte'
	import properties from 'creator/properties.svelte'
	import sheet from 'creator/sheet.svelte'
    import skills from 'creator/skills.svelte'
    import traits from 'creator/traits.svelte'
	import { beforeUpdate, onMount } from 'svelte'
	import { goto } from '@sapper/app'
    import { character } from 'stores/characterStore.js'


    const pages = [
        description,
        traits,
        skills,
        properties,
        abilities,
        gear,
        sheet
    ]

    $: current = $character.meta.status.step

	let proceed

	$: nextButton = '&#10006;'

	const back = _ => $character.meta.status.step--

	const next = _ => {
		proceedStatus()
		if (proceed) $character.meta.status.step++
	}

	const proceedStatus = _ => {
		proceed = true
		if (
			(current == 0 && Object.values($character.desc).some(d => d.value == ``)) ||
			(current == 1 && Traits.remaining($character) > 0) ||
			(current == 2 && Skills.remaining($character) > 0) ||
			(current == 5 && Object.values($character.gear).some(g => g.inventory.length == 0))
		) proceed = false
		if (proceed) nextButton = '&rtrif;'
		else nextButton = '&#10006;'
	}

    beforeUpdate(_ => proceedStatus())

	onMount(_ => proceedStatus())
</script>


<div class='creator-page'>
    <svelte:component this={pages[$character.meta.status.step]} />
</div>
<div class='nav-bar'>
	<button on:click={back} class='link-btn nav-button'>&ltrif;</button>
	<button on:click={_ => goto('/')} class='link-btn nav-button home-button'>Home</button>
	<button on:click={next} class='link-btn nav-button'>{@html nextButton}</button>
</div>


<style>
    .creator-page {
        padding: var(--s100);
        padding-bottom: var(--s400);
    }
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
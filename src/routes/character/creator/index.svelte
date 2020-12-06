<script>
    import Character from 'classes/Character.js'
	import NavBar from 'views/character/creator/NavBar.svelte'
	import abilities from 'creator/abilities.svelte'
	import description from 'creator/description.svelte'
	import finalize from 'creator/finalize.svelte'
	import gear from 'creator/gear.svelte'
	import properties from 'creator/properties.svelte'
    import skills from 'creator/skills.svelte'
    import traits from 'creator/traits.svelte'
    import { character } from 'stores/characterStore.js'
    import { onMount } from 'svelte'

    const pages = [
        description,
        traits,
        skills,
        properties,
        abilities,
        gear,
        finalize
    ]

    onMount(_ => {
        $character = new Character()
        document.getElementById('creator-page').scrollTop = 0
        console.log(document.getElementById('creator-page'))
    })
</script>


<div id='creator-page' class='creator-page'>
    <svelte:component this={pages[$character.meta.step]} />
</div>
<NavBar />


<style>
    .creator-page {
        bottom: var(--std-input-height);
        left: 0;
        overflow: scroll;
        padding: var(--std-padding);
        position: absolute;
        right: 0;
        top: 0;
        margin-top: var(--square);
    }
</style>
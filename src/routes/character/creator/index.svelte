<script>
    import Character from 'classes/Character.js'
	import NavBar from 'views/character/creator/NavBar.svelte'
	import abilities from 'creator/abilities.svelte'
	import description from 'creator/description.svelte'
	import gear from 'creator/gear.svelte'
	import properties from 'creator/properties.svelte'
	import sheet from 'character/sheet.svelte'
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
        sheet
    ]

    onMount(_ => $character = new Character() )
</script>


<div class='creator-page'>
    <svelte:component this={pages[$character.meta.status.step]} />
</div>
<NavBar />


<style>
    .creator-page {
        padding: var(--std-padding);
        padding-bottom: var(--s400);
    }
</style>
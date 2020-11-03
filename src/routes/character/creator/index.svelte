<script>
	import NavBar from 'views/character/creator/NavBar.svelte'
	import abilities from 'creator/abilities.svelte'
	import description from 'creator/description.svelte'
	import gear from 'creator/gear.svelte'
	import properties from 'creator/properties.svelte'
	import sheet from 'creator/sheet.svelte'
    import skills from 'creator/skills.svelte'
    import traits from 'creator/traits.svelte'
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
</script>


<div class='creator-page'>
    <svelte:component this={pages[$character.meta.status.step]} />
</div>
<NavBar />


<style>
    .creator-page {
        padding: var(--s100);
        padding-bottom: var(--s400);
    }
</style>
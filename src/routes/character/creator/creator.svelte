<script>
    import NavBar from 'views/character/Navbar.svelte'
	import abilities from 'creator/abilities.svelte'
	import description from 'creator/description.svelte'
	import gear from 'creator/gear.svelte'
	import properties from 'creator/properties.svelte'
	import sheet from 'creator/sheet.svelte'
	import skills from 'creator/skills.svelte'
    import traits from 'creator/traits.svelte'

    let page

    let step = 0

    const pages = [
        description,
        traits,
        skills,
        properties,
        abilities,
        gear,
        sheet
    ]

    const navigate = (event) => {
        console.log(event)
        step = event.detail.message.step
        page = pages[step]
    }
</script>


<div class='creator-page'>
    <svelte:component this={page} />
</div>
<NavBar on:step={navigate} />


<style>
    .creator-page {
        padding: var(--s100);
        padding-bottom: var(--s400);
    }
</style>
<script>
    import router from '../routes.js'
    import NavBar from '../layout/NavBar.svelte'
    import Description from '../components/creator/Description.svelte'
    import Traits from '../components/creator/Traits.svelte'
    import Skills from '../components/creator/Skills.svelte'
    import Properties from '../components/creator/Properties.svelte'
    import Health from '../components/creator/Health.svelte'
    import Defenses from '../components/creator/Defenses.svelte'
    import Abilities from '../components/creator/Abilities.svelte'

    let page_number = 0

    let next = function() { page_number < 4 ? page_number++ : router.goHome() }

    let back = function() { page_number > 0 ? page_number-- : router.goHome() }
</script>

<div class="page creator-page">
    {#if page_number === 0}
        <Description />
    {:else if page_number === 1}
        <Traits />
    {:else if page_number === 2}
        <Skills />
    {:else if page_number === 3}
        <Properties />
        <Health />
        <Defenses />
    {:else if page_number === 4}
        <Abilities />
    {/if}
    <div class="nav-bar">
        <button class="nav-button" on:click={back}>Back</button>
        <button class="nav-button" on:click={next}>Next</button>
    </div>
</div>

<style>
    .nav-bar {
        display: flex;
        flex-direction: row;
        position: fixed;
        left: 0;
        bottom: 1px;
        height: 50px;
        width: 100%;
    }
    .nav-button {
        border: 1px solid;
        width: 50%;
    }
</style>

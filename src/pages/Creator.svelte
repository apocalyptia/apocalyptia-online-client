<script>
    import router from '../routes'
    import Description from '../components/creator/Description.svelte'
    import Traits from '../components/creator/Traits.svelte'
    import Skills from '../components/creator/Skills.svelte'
    import Properties from '../components/creator/Properties.svelte'
    import Abilities from '../components/creator/Abilities.svelte'

    let step_number = 0

    let next = () => {
        step_number < 4 ? step_number++ : router.Home()
    }

    let back = () => { step_number > 0 ? step_number-- : router.Home() }
</script>

<div class="creator-steps">
    {#if step_number === 0}
        <Traits />
    {:else if step_number === 1}
        <Description />
    {:else if step_number === 2}
        <Skills />
    {:else if step_number === 3}
        <Properties />
    {:else if step_number === 4}
        <Abilities />
    {/if}
</div>
<div class="nav-bar">
    <button class="nav-button" on:click={back}>Back</button>
    <button class="nav-button" on:click={next}>Next</button>
</div>

<style>
    .creator-steps {
        padding: 20px;
        width: calc(100vw - 40px);
    }
    .nav-bar {
        display: flex;
        flex-direction: row;
        position: fixed;
        left: 0;
        bottom: 1px;
        height: 40px;
        width: 100vw;
    }
    .nav-button {
        border: 1px solid;
        width: 50vw;
    }
</style>

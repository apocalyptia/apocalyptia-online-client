<script>
    import router from '../routes'
    import BackNextButtons from '../layout/BackNextButtons.svelte'
    import Combat from '../components/rules/Combat.svelte'
    import Creation from '../components/rules/Creation.svelte'
    import Dice from '../components/rules/Dice.svelte'
    import Maneuvers from '../components/rules/Maneuvers.svelte'
    import Situations from '../components/rules/Situations.svelte'
    import Skills from '../components/rules/Skills.svelte'
    import Terms from '../components/rules/Terms.svelte'
    import Traits from '../components/rules/Traits.svelte'

    let step = 0
    const options = [Terms, Dice, Creation, Traits, Skills, Combat, Maneuvers, Situations ]

    function nav(event) {
        step = event.detail.number
        if (step == options.length || step < 0) { router.Home() }
        else { selected = options[step] }
    }
</script>

<div class='page rules-page'>
    <Combat />
    <div class='nav-bar'>
        <button class='nav-button' on:click={router.Home}>Home</button>
    </div>
    <BackNextButtons step={step} on:message={nav} />

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
        width: 25%;
    }
</style>
<script>
    import router from '../routes'
    import BackNextButtons from '../layout/BackNextButtons.svelte'
    import Combat from '../components/reference/Combat.svelte'
    import Creation from '../components/reference/Creation.svelte'
    import Dice from '../components/reference/Dice.svelte'
    import Maneuvers from '../components/reference/Maneuvers.svelte'
    import Situations from '../components/reference/Situations.svelte'
    import Skills from '../components/reference/Skills.svelte'
    import Terms from '../components/reference/Terms.svelte'
    import Traits from '../components/reference/Traits.svelte'

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
    <BackNextButtons step={step} on:message={nav} />
</div>

<style>
</style>
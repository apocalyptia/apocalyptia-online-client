<script>
    import router from '../routes';
    import BackNextButtons from '../layout/BackNextButtons.svelte'
    import Description from '../components/creator/Description.svelte'
    import Traits from '../components/creator/Traits.svelte'
    import Skills from '../components/creator/Skills.svelte'
    import Properties from '../components/creator/Properties.svelte'
    import Abilities from '../components/creator/Abilities.svelte'

    let step = 0;
    const options = [ Traits, Description, Skills, Properties, Abilities ];
    let selected = options[step];

    function handleChange(event) {
        step = event.detail.number;
        if (step == options.length || step < 0) { router.Home() }
        else { selected = options[step] }
    }
</script>

<div>
    <svelte:component this={selected}/>
</div>
<BackNextButtons step={step} on:message={handleChange} />

<style>
    div {
        padding: 20px;
        width: calc(100vw - 40px);
    }
</style>

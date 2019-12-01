<script>
    import router from '../routes'
    import BackNextButtons from '../layout/BackNextButtons.svelte'
    import RefList from '../layout/RefList.svelte'
    import { Combat } from '../models/rules/combat.js'

    let step = 0
    const pages = [
        { name: 'Combat', rules: Combat }
    ]
    let selected = pages[step]

    function nav(event) {
        step = event.detail.number
        if (step == pages.length || step < 0) { router.Home() }
        else { selected = pages[step] }
    }
</script>

<div class='page'>
    <svelte:component this={RefList} list={selected} />
</div>
<BackNextButtons step={step} on:message={nav} />

<style>
    .page {
        padding: 25px;
    }
</style>
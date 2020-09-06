<script>
    import Combat from '../../rules/combat/Combat'
    import NavBar from '../../views/widgets/NavBar.svelte'
    import RulesPage from './_RulesPage.svelte'
</script>


<RulesPage chapter={Combat}/>
<NavBar links={{back: '/rules/abilities', next: '/rules/complications'}}/>
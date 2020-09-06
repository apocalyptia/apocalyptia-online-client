<script>
    import Complications from '../../rules/complications/Complications'
    import NavBar from '../../views/widgets/NavBar.svelte'
    import RulesPage from './_RulesPage.svelte'
</script>


<RulesPage chapter={Complications}/>
<NavBar links={{back: '/rules/combat', next: '/rules/core'}}/>
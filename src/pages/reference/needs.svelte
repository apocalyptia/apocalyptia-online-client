<script>
    import NavBar from '../../views/widgets/NavBar.svelte'
    import Needs from '../../rules/needs/Needs'
    import RulesPage from './_RulesPage.svelte'
</script>


<RulesPage chapter={Needs}/>
<NavBar links={{back: '/rules/maneuvers', next: '/rules/properties'}}/>
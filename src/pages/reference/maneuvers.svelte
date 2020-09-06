<script>
    import Maneuvers from '../../rules/maneuvers/Maneuvers'
    import NavBar from '../../views/widgets/NavBar.svelte'
    import RulesPage from './_RulesPage.svelte'
</script>


<RulesPage chapter={Maneuvers}/>
<NavBar links={{back: '/rules/gear', next: '/rules/needs'}}/>
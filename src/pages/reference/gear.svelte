<script>
    import Gear from '../../rules/gear/GearList'
    import NavBar from '../../views/widgets/NavBar.svelte'
    import RulesPage from './_RulesPage.svelte'
</script>


<RulesPage chapter={Gear}/>
<NavBar links={{back: '/rules/core', next: '/rules/maneuvers'}}/>
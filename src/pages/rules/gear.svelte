<script>
    import Gear from 'src/components/rules/gear/GearList'
    import NavBar from 'src/components/views/controls/NavBar.svelte'
    import RulesPage from 'src/components/views/rules/RulesPage.svelte'
</script>


<RulesPage chapter={Gear}/>
<NavBar links={{back: '/rules/core', next: '/rules/maneuvers'}}/>
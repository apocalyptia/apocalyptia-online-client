<script>
    import NavBar from 'src/components/views/controls/NavBar.svelte'
    import Needs from 'src/components/rules/needs/Needs'
    import RulesPage from 'src/components/views/rules/RulesPage.svelte'
</script>


<RulesPage chapter={Needs}/>
<NavBar links={{back: '/rules/maneuvers', next: '/rules/properties'}}/>
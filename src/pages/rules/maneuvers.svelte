<script>
    import Maneuvers from 'src/components/rules/maneuvers/Maneuvers'
    import NavBar from 'src/components/views/controls/NavBar.svelte'
    import RulesPage from 'src/components/views/rules/RulesPage.svelte'
</script>


<RulesPage chapter={Maneuvers}/>
<NavBar links={{back: '/rules/gear', next: '/rules/needs'}}/>
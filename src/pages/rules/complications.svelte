<script>
    import Complications from 'src/components/rules/complications/Complications'
    import NavBar from 'src/components/views/controls/NavBar.svelte'
    import RulesPage from 'src/components/views/rules/RulesPage.svelte'
</script>


<RulesPage chapter={Complications}/>
<NavBar links={{back: '/rules/combat', next: '/rules/core'}}/>
<script>
    import Abilities from 'src/components/rules/abilities/Abilities'
    import NavBar from 'src/components/views/controls/NavBar.svelte'
    import RulesPage from 'src/components/views/rules/RulesPage.svelte'
</script>


<RulesPage chapter={Abilities}/>
<NavBar links={{back: '/rules/', next: '/rules/combat'}}/>
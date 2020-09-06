<script>
    import Combat from 'src/components/rules/combat/Combat'
    import NavBar from 'src/components/views/controls/NavBar.svelte'
    import RulesPage from 'src/components/views/rules/RulesPage.svelte'
</script>


<RulesPage chapter={Combat}/>
<NavBar links={{back: '/rules/abilities', next: '/rules/complications'}}/>
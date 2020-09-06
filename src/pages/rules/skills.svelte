<script>
    import NavBar from 'src/components/views/controls/NavBar.svelte'
    import RulesPage from 'src/components/views/rules/RulesPage.svelte'
    import Skills from 'src/components/rules/skills/Skills'

    Skills.list = Skills.list.sort((a, b) => (a.name > b.name))
</script>


<RulesPage chapter={Skills}/>
<NavBar links={{back: '/rules/properties', next: '/rules/status'}}/>
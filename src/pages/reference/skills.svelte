<script>
    import NavBar from '../../views/widgets/NavBar.svelte'
    import RulesPage from './_RulesPage.svelte'
    import Skills from '../../rules/skills/Skills'

    Skills.list = Skills.list.sort((a, b) => (a.name > b.name))
</script>


<RulesPage chapter={Skills}/>
<NavBar links={{back: '/rules/properties', next: '/rules/status'}}/>
<script>
    import Core from 'src/components/rules/core/Core'
    import NavBar from 'src/components/views/controls/NavBar.svelte'
    import RulesPage from 'src/components/views/rules/RulesPage.svelte'
</script>


<RulesPage chapter={Core}/>
<NavBar links={{back: '/rules/complications', next: '/rules/gear'}}/>
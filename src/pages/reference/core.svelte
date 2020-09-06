<script>
    import Core from '../../rules/core/Core'
    import NavBar from '../../views/widgets/NavBar.svelte'
    import RulesPage from './_RulesPage.svelte'
</script>


<RulesPage chapter={Core}/>
<NavBar links={{back: '/rules/complications', next: '/rules/gear'}}/>
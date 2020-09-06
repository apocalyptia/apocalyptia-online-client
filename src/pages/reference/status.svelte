<script>
    import NavBar from '../../views/widgets/NavBar.svelte'
    import RulesPage from './_RulesPage.svelte'
    import Status from '../../rules/status/Status'
</script>


<RulesPage chapter={Status}/>
<NavBar links={{back: '/rules/skills', next: '/rules/traits'}}/>
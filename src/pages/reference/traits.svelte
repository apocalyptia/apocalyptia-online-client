<script>
    import NavBar from '../../views/widgets/NavBar.svelte'
    import RulesPage from './_RulesPage.svelte'
    import Traits from '../../rules/traits/Traits'
</script>


<RulesPage chapter={Traits}/>
<NavBar links={{back: '/rules/status', next: '/rules/'}}/>
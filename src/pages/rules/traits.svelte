<script>
    import NavBar from 'src/components/views/controls/NavBar.svelte'
    import RulesPage from 'src/components/views/rules/RulesPage.svelte'
    import Traits from 'src/components/rules/traits/Traits'
</script>


<RulesPage chapter={Traits}/>
<NavBar links={{back: '/rules/status', next: '/rules/'}}/>
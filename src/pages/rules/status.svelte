<script>
    import NavBar from 'src/components/views/controls/NavBar.svelte'
    import RulesPage from 'src/components/views/rules/RulesPage.svelte'
    import Status from 'src/components/rules/status/Status'
</script>


<RulesPage chapter={Status}/>
<NavBar links={{back: '/rules/skills', next: '/rules/traits'}}/>
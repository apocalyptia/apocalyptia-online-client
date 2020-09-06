<script>
    import NavBar from 'src/components/views/controls/NavBar.svelte'
    import Properties from 'src/components/rules/properties/Properties'
    import RulesPage from 'src/components/views/rules/RulesPage.svelte'
</script>


<RulesPage chapter={Properties}/>
<NavBar links={{back: '/rules/needs', next: '/rules/skills'}}/>
<script>
    import NavBar from '../../views/widgets/NavBar.svelte'
    import Properties from '../../rules/properties/Properties'
    import RulesPage from './_RulesPage.svelte'
</script>


<RulesPage chapter={Properties}/>
<NavBar links={{back: '/rules/needs', next: '/rules/skills'}}/>
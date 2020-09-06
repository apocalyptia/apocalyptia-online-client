<script>
    import Abilities from '../../rules/abilities/Abilities'
    import NavBar from '../../views/widgets/NavBar.svelte'
    import RulesPage from './_RulesPage.svelte'
</script>


<RulesPage chapter={Abilities}/>
<NavBar links={{back: '/rules/', next: '/rules/combat'}}/>
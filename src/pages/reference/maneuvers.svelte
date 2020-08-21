<script>
    import RefPage from '../../components/views/reference/RefPage.svelte'
    import Maneuvers from '../../components/rules/maneuvers/Maneuvers'
    import NavBar from '../../components/views/controls/NavBar.svelte'
</script>


<RefPage chapter={Maneuvers}/>
<NavBar links={{back: '/reference/gear', next: '/reference/needs'}}/>
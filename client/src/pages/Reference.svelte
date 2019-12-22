<script>
	import { router } from '../routes'
	// import NavButtons from '../layout/NavButtons.svelte'
	import RefList from '../components/reference/RefList.svelte'
	import RefCombat from '../components/reference/RefCombat.svelte'
	import RefManeuvers from '../components/reference/RefManeuvers.svelte'
	import RefSituations from '../components/reference/RefSituations.svelte'
</script>

<div class='menu-page'>
	<button on:click={router.RefCombat}>Combat</button>
	<button on:click={router.RefManeuvers}>Maneuvers</button>
	<button on:click={router.RefSituations}>Situations</button>
</div>
<!-- <NavButtons {screen} on:message={(event) => nav(event.detail.number, screen)} /> -->

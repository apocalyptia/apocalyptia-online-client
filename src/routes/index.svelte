<script>
	import LandingPage from 'views/LandingPage.svelte'
	import { player } from 'stores/playerStore.js'
	import { onMount } from 'svelte'

	onMount(_ => {
		console.log($player)
	})
</script>


<LandingPage />
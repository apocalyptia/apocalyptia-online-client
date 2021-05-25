<script>
	// import UserLogin from '/src/components/home/UserLogin.svelte'
	// import playerStore from '/src/stores/playerStore.js'
	import MainMenu from '/src/components/home/MainMenu.svelte'
	import Spinner from '/src/components/widgets/Spinner.svelte'
	import rulesStore from '/src/stores/rulesStore.js'
	import { onMount } from 'svelte'

	onMount(() => {
		if ($rulesStore.list === undefined) {
			$rulesStore.load()
		}
	})
</script>



<!-- {#if $playerStore.loggedIn} -->
{#await $rulesStore.list === undefined}
	<div class='cntr-card'>
		<Spinner />
	</div>
{:then}
	<MainMenu />
{/await}
<!-- {:else}
	<UserLogin />
{/if} -->
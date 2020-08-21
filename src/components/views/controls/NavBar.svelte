<script>
	import { url } from '@sveltech/routify'
	import Spinner from '../ui/Spinner.svelte'

	export let links = true
	export let status = `go`
	export let onNext = true
	export let onBack = true
	export let onHome = true
</script>


<div class='nav-bar'>
	<a href={$url(links.back)}
		class='link-btn nav-button'
		on:click={onBack}
	>
		&ltrif;
	</a>
	<a href={$url('/')}
		class='link-btn nav-button home-button'
		on:click={onHome}
	>
		Home
	</a>
	<a href={$url(links.next)} 
		class='link-btn nav-button'
		on:click={onNext}
	>
		{#if status == 'go'}
			&rtrif;
		{:else}
			X
		{/if}
	</a>
</div>


<style>
	.nav-bar {
		bottom: 0;
		display: flex;
		height: var(--s300);
		left: 0;
		position: fixed;
		width: 100%;
		z-index: 2;
	}
	.nav-button {
		flex: 1;
	}
	.home-button {
		font-size: var(--s125);
	}
</style>
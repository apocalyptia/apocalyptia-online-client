<script>
	import UserMenu from './UserMenu.svelte'
	import { authUserStore } from '../../stores/netlifyStore'
	import { url } from '@roxi/routify'

	export let version
</script>


<div class='title-bar'>
	<a href={$url('/')} class='link-btn title-link'>
		<span class='app-title'>Apocalyptia Online</span>
		<sub>{version}</sub>
	</a>
	{#if $authUserStore}
		<UserMenu/>
	{/if}
</div>


<style>
	.title-bar {
		display: flex;
		max-height: var(--s300);
		position: fixed;
		top: 0;
		transition: top 0.3s linear;
		width: 100%;
		z-index: 2;
	}
	.title-link {
		padding: var(--s100);
		width: 100%;
	}
	sub {
		color: crimson;
		border: var(--s1) dotted crimson;
		margin-top: var(--s50);
		margin-left: var(--s25);
		font-size: var(--s75);
		padding: var(--s10);
	}
</style>
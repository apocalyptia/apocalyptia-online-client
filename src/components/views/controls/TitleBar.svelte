<script>
	import { url } from '@roxi/routify'
	import UserMenu from './UserMenu.svelte'
	import { authUserStore } from '../../../stores/netlifyStore'
	import { app_version } from '../../../main'
</script>


<div class='title-bar'>
	<a href={$url('/')} class='link-btn title-link'>
		<h1>Apocalyptia Online</h1>
		<sub>{app_version}</sub>
	</a>
	{#if $authUserStore}
		<UserMenu/>
	{/if}
</div>


<style>
	.title-bar {
		display: flex;
		height: var(--s300);
		position: fixed;
		top: 0;
		transition: top 0.3s linear;
		width: calc(100vw - (var(--s1) * 2));
		z-index: 2;
	}
	.title-link {
		width: 100%;
	}
	h1 {
		display: inline;
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
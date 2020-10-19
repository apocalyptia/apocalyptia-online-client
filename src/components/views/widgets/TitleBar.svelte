<script>
	import UserMenu from './UserMenu.svelte'
	import { authUserStore } from 'stores/netlifyStore.js'
</script>


<div class='title-bar'>
	<a href='/' class='link-btn title-link'>
		<span class='app-title'>Apocalyptia Online</span>
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
</style>
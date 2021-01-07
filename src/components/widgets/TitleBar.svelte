<script>
	import MenuButton from 'components/buttons/MenuButton.svelte'
	import UserMenu from 'components/widgets/UserMenu.svelte'
	import { playerStore } from 'stores/playerStore.js'
</script>


<div class='title-bar'>
	<a href='/' class='link-btn title-link {$playerStore.loggedIn ? 'part-width' : 'full-width'}'>
		<span class='app-title'>Apocalyptia Online</span>
	</a>
	{#if $playerStore.loggedIn}
		<MenuButton />
		<UserMenu />
	{/if}
</div>


<style>
	.title-bar {
		display: flex;
		height: var(--square);
		position: fixed;
		top: 0;
		transition: top 0.3s linear;
		width: 100vw;
		z-index: 9;
	}
	.title-link {
		padding: var(--std-padding);
	}
	.full-width {
		width: 100vw;
	}
	.part-width {
		width: calc(100vw - var(--square));
	}
</style>
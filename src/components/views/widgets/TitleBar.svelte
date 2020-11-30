<script>
	import MenuButton from 'icons/MenuButton.svelte'
	import UserMenu from 'widgets/UserMenu.svelte'
</script>


<div class='title-bar'>
	<a href='/' class='link-btn title-link'>
		<span class='app-title'>Apocalyptia Online</span>
	</a>
	<MenuButton />
</div>
<UserMenu />


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
		width: calc(100vw - var(--square));
	}
</style>
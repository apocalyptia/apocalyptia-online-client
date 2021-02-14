<script>
	import MenuButton from 'components/buttons/MenuButton.svelte'
	import UserMenu from 'components/widgets/UserMenu.svelte'
</script>


<div class='title-bar'>
	<a href='/' class='link-btn title-link part-width'>
		<div class='app-title'>Apocalyptia Online</div>
	</a>
	<MenuButton />
	<UserMenu />
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
		display: block;
		padding: var(--std-padding);
	}
	.part-width {
		width: calc(100vw - var(--square));
	}
</style>
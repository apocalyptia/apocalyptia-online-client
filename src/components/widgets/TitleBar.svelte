<script>
	import MenuButton from 'components/buttons/MenuButton.svelte'
	import UserMenu from 'components/widgets/UserMenu.svelte'
</script>


<header>
	<a href='/' class='link-btn'>
		<h1>Apocalyptia Online</h1>
	</a>
	<MenuButton />
	<UserMenu />
</header>


<style>
	header {
		display: flex;
		height: var(--square);
		position: fixed;
		top: 0;
		transition: top 0.3s linear;
		width: 100vw;
		z-index: 9;
	}
	a {
		display: block;
		padding: var(--std-padding);
		width: calc(100vw - var(--square));
	}
</style>
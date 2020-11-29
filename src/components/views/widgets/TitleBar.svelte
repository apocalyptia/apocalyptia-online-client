<script>
	import UserMenu from 'icons/UserMenu.svelte'
</script>


<div class='title-bar'>
	<a href='/' class='link-btn title-link'>
		<span class='app-title'>Apocalyptia Online</span>
	</a>
	<UserMenu />
</div>


<style>
	.title-bar {
		display: flex;
		max-height: var(--square);
		position: sticky;
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